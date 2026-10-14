"""Thin HTTP layer with polite rate limiting and a disk cache.

Every paid-credit lookup goes through the cache, so re-running the pipeline
never spends the same free credit twice.
"""

from __future__ import annotations

import hashlib
import json
import time
from pathlib import Path
from typing import Any

import requests


class HttpError(Exception):
    def __init__(self, status: int, url: str, body: str = ""):
        super().__init__(f"HTTP {status} for {url}: {body[:200]}")
        self.status = status


class Http:
    def __init__(self, cache_dir: Path | None = None, user_agent: str = "DataDrop-leadgen/0.1",
                 min_interval: float = 0.25, timeout: float = 20.0):
        self.session = requests.Session()
        self.session.headers["User-Agent"] = user_agent
        self.cache_dir = cache_dir
        self.min_interval = min_interval
        self.timeout = timeout
        self._last: dict[str, float] = {}

    def _throttle(self, url: str) -> None:
        host = url.split("/")[2] if "://" in url else url
        wait = self.min_interval - (time.monotonic() - self._last.get(host, 0))
        if wait > 0:
            time.sleep(wait)
        self._last[host] = time.monotonic()

    def _cache_path(self, key: str) -> Path | None:
        if not self.cache_dir:
            return None
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        return self.cache_dir / (hashlib.sha256(key.encode()).hexdigest()[:32] + ".json")

    def request(self, method: str, url: str, *, params: dict | None = None, headers: dict | None = None,
                json_body: Any = None, auth: tuple | None = None, cache: bool = False,
                as_text: bool = False) -> Any:
        # Secrets in params/headers are excluded from the cache key on purpose.
        safe_params = {k: v for k, v in (params or {}).items() if "key" not in k.lower()}
        cache_key = json.dumps([method, url, safe_params, json_body, as_text], sort_keys=True, default=str)
        path = self._cache_path(cache_key) if cache else None
        if path and path.exists():
            return json.loads(path.read_text())["body"]
        self._throttle(url)
        resp = self.session.request(method, url, params=params, headers=headers, json=json_body,
                                    auth=auth, timeout=self.timeout)
        if resp.status_code == 429:
            time.sleep(5)
            resp = self.session.request(method, url, params=params, headers=headers, json=json_body,
                                        auth=auth, timeout=self.timeout)
        if resp.status_code >= 400:
            raise HttpError(resp.status_code, url, resp.text)
        body = resp.text if as_text else resp.json()
        if path:
            path.write_text(json.dumps({"body": body}))
        return body

    def get_json(self, url: str, **kw) -> Any:
        return self.request("GET", url, **kw)

    def post_json(self, url: str, body: Any, **kw) -> Any:
        return self.request("POST", url, json_body=body, **kw)

    def get_text(self, url: str, **kw) -> str:
        return self.request("GET", url, as_text=True, **kw)
