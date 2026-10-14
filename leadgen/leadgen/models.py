from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Company:
    name: str
    domain: str | None = None
    hq_country: str | None = None  # "US", "UK", ...
    attio_id: str | None = None
    uk_company_number: str | None = None


@dataclass
class Candidate:
    """A person who might be a decision-maker at a target company."""

    first_name: str
    last_name: str
    title: str = ""
    country: str | None = None  # where the PERSON is, not the company
    sources: list[str] = field(default_factory=list)
    email: str | None = None
    email_source: str | None = None
    email_status: str = "none"  # none | guessed | found | valid | risky | invalid
    email_score: int | None = None
    attio_id: str | None = None
    notes: list[str] = field(default_factory=list)

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()

    def key(self) -> str:
        return f"{self.first_name.lower()}|{self.last_name.lower()}"

    def merge(self, other: "Candidate") -> None:
        for s in other.sources:
            if s not in self.sources:
                self.sources.append(s)
        if not self.title and other.title:
            self.title = other.title
        if not self.country and other.country:
            self.country = other.country
        if not self.email and other.email:
            self.email = other.email
            self.email_source = other.email_source
            self.email_status = other.email_status
            self.email_score = other.email_score
        self.notes.extend(n for n in other.notes if n not in self.notes)


@dataclass
class Lead:
    """A newly discovered company that may hold a B1-style archive."""

    name: str
    source: str
    event: str
    date: str
    url: str
    country: str | None = None
    detail: str = ""
