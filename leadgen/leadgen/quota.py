"""Monthly credit ledger. Refuses a call before it would exceed a cap."""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path


class QuotaExceeded(Exception):
    pass


class Quota:
    def __init__(self, path: Path, caps: dict[str, int], today: dt.date | None = None):
        self.path = path
        self.caps = caps
        self.month = (today or dt.date.today()).strftime("%Y-%m")
        self.data: dict = json.loads(path.read_text()) if path.exists() else {}

    def used(self, bucket: str) -> int:
        return self.data.get(self.month, {}).get(bucket, 0)

    def remaining(self, bucket: str) -> int:
        return max(0, self.caps.get(bucket, 0) - self.used(bucket))

    def can_spend(self, bucket: str, n: int = 1) -> bool:
        return self.remaining(bucket) >= n

    def spend(self, bucket: str, n: int = 1) -> None:
        if not self.can_spend(bucket, n):
            raise QuotaExceeded(f"{bucket}: {self.used(bucket)}/{self.caps.get(bucket, 0)} used this month")
        self.data.setdefault(self.month, {})[bucket] = self.used(bucket) + n
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(self.data, indent=2))

    def summary(self) -> list[tuple[str, int, int]]:
        return [(b, self.used(b), c) for b, c in sorted(self.caps.items())]
