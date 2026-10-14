"""Email-pattern inference and candidate generation (free)."""

from __future__ import annotations

import re
import unicodedata

PATTERNS = [
    "{first}.{last}", "{first}", "{f}{last}", "{first}{last}", "{f}.{last}", "{first}_{last}",
    "{first}{l}", "{last}", "{last}.{first}", "{first}-{last}",
]


def _clean(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z]", "", s.lower())


def render(pattern: str, first: str, last: str, domain: str) -> str | None:
    f, l = _clean(first), _clean(last.split()[-1] if last else "")
    if not f or (("{last}" in pattern or "{l}" in pattern) and not l):
        return None
    local = pattern.format(first=f, last=l, f=f[:1], l=l[:1])
    return f"{local}@{domain}"


def infer(examples: list[tuple[str, str, str]]) -> str | None:
    """examples: (first, last, email). Returns the pattern that explains the most."""
    scores: dict[str, int] = {}
    for first, last, email in examples:
        dom = email.rsplit("@", 1)[-1]
        for p in PATTERNS:
            if render(p, first, last, dom) == email.lower():
                scores[p] = scores.get(p, 0) + 1
    if not scores:
        return None
    return max(scores.items(), key=lambda kv: (kv[1], -PATTERNS.index(kv[0])))[0]


def candidates(first: str, last: str, domain: str, known: str | None = None, limit: int = 3) -> list[str]:
    order = ([known] if known else []) + [p for p in PATTERNS if p != known]
    out = []
    for p in order:
        e = render(p, first, last, domain)
        if e and e not in out:
            out.append(e)
        if len(out) >= limit:
            break
    return out
