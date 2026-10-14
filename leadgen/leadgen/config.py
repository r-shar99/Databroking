"""Configuration: API keys come from the environment (or a .env file)."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


# Conservative monthly caps, set at or below each vendor's free tier.
# Vendors change these often: check your dashboards and adjust.
DEFAULT_CAPS: dict[str, int] = {
    "hunter.search": 25,
    "hunter.verify": 50,
    "tomba.search": 25,
    "tomba.verify": 50,
    "prospeo.search": 75,
    "reoon.verify": 500,
    "zerobounce.verify": 100,
}

DEFAULT_TARGET_TITLES = [
    "founder", "co-founder", "cofounder", "ceo", "chief executive",
    "cto", "chief technology", "coo", "chief operating", "cfo",
    "chief financial", "general counsel", "president", "owner",
    "managing director", "director", "trustee", "administrator", "assignee",
]


@dataclass
class Settings:
    data_dir: Path
    hunter_key: str | None = None
    tomba_key: str | None = None
    tomba_secret: str | None = None
    prospeo_key: str | None = None
    reoon_key: str | None = None
    zerobounce_key: str | None = None
    companies_house_key: str | None = None
    courtlistener_token: str | None = None
    attio_key: str | None = None
    sec_user_agent: str | None = None
    caps: dict[str, int] = field(default_factory=lambda: dict(DEFAULT_CAPS))
    target_titles: list[str] = field(default_factory=lambda: list(DEFAULT_TARGET_TITLES))
    # Rule 6: unknown person country => "Do not email". Setting this to True
    # falls back to the company's HQ country. Off by default.
    infer_country_from_company: bool = False
    max_candidates_per_company: int = 3

    @classmethod
    def from_env(cls, base: Path | None = None) -> "Settings":
        base = base or Path.cwd()
        load_dotenv(base / ".env")
        caps = dict(DEFAULT_CAPS)
        for k in list(caps):
            env = "LEADGEN_CAP_" + k.upper().replace(".", "_")
            if os.environ.get(env):
                caps[k] = int(os.environ[env])
        g = os.environ.get
        return cls(
            data_dir=Path(g("LEADGEN_DATA_DIR", str(base / "data"))),
            hunter_key=g("HUNTER_API_KEY"),
            tomba_key=g("TOMBA_API_KEY"),
            tomba_secret=g("TOMBA_API_SECRET"),
            prospeo_key=g("PROSPEO_API_KEY"),
            reoon_key=g("REOON_API_KEY"),
            zerobounce_key=g("ZEROBOUNCE_API_KEY"),
            companies_house_key=g("COMPANIES_HOUSE_API_KEY"),
            courtlistener_token=g("COURTLISTENER_TOKEN"),
            attio_key=g("ATTIO_API_KEY"),
            sec_user_agent=g("SEC_USER_AGENT"),
            caps=caps,
            infer_country_from_company=g("LEADGEN_INFER_COUNTRY", "") == "1",
        )
