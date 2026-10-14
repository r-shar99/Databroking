"""Minimal Attio REST client for the objects this pipeline touches."""

from __future__ import annotations

from .http import Http
from .models import Candidate, Company


def _first(values: dict, slug: str, key: str = "value"):
    v = values.get(slug) or []
    return v[0].get(key) if v else None


class Attio:
    BASE = "https://api.attio.com/v2"

    def __init__(self, http: Http, key: str | None):
        self.http = http
        self.headers = {"Authorization": f"Bearer {key}"} if key else None

    @property
    def enabled(self) -> bool:
        return bool(self.headers)

    def _query(self, obj: str, flt: dict, limit: int = 100) -> list[dict]:
        out, offset = [], 0
        while True:
            res = self.http.post_json(f"{self.BASE}/objects/{obj}/records/query",
                                      {"filter": flt, "limit": limit, "offset": offset}, headers=self.headers)
            batch = res.get("data", [])
            out.extend(batch)
            if len(batch) < limit:
                return out
            offset += limit

    def supplier_companies(self) -> list[Company]:
        out = []
        for r in self._query("companies", {"company_type": "Supplier"}):
            v = r.get("values", {})
            out.append(Company(name=_first(v, "name") or "", domain=_first(v, "domains", "domain"),
                               hq_country=_first(v, "hq_country"), attio_id=r["id"]["record_id"]))
        return out

    def people_at(self, company: Company) -> list[Candidate]:
        if not company.attio_id:
            return []
        rows = self._query("people", {"company": {"target_object": "companies",
                                                  "target_record_id": company.attio_id}})
        out = []
        for r in rows:
            v = r.get("values", {})
            nm = (v.get("name") or [{}])[0]
            c = Candidate(first_name=nm.get("first_name") or "", last_name=nm.get("last_name") or "",
                          title=_first(v, "job_title") or "", attio_id=r["id"]["record_id"],
                          country=_first(v, "primary_location", "country_code"), sources=["attio"])
            email = _first(v, "email_addresses", "email_address")
            if email:
                c.email, c.email_source, c.email_status = email.lower(), "attio", "valid"
            if _first(v, "suppressed"):
                c.notes.append("SUPPRESSED")
            lb = (v.get("lawful_basis") or [{}])[0].get("option", {}).get("title")
            if lb:
                c.notes.append(f"lawful_basis={lb}")
            out.append(c)
        return out

    def write_person(self, company: Company, c: Candidate, lawful_basis: str, provenance: str) -> str:
        values: dict = {
            "name": [{"first_name": c.first_name, "last_name": c.last_name, "full_name": c.full_name}],
            "job_title": c.title[:200],
            "company": [{"target_object": "companies", "target_record_id": company.attio_id}],
            "description": provenance[:1000],
        }
        if c.email and c.email_status == "valid":
            values["email_addresses"] = [c.email]
        if c.attio_id:
            # Never loosen an existing record: only add facts, keep its lawful basis.
            values.pop("company")
            self.http.request("PATCH", f"{self.BASE}/objects/people/records/{c.attio_id}",
                              json_body={"data": {"values": values}}, headers=self.headers)
            return c.attio_id
        values.update({"contact_source": "Manual", "lawful_basis": lawful_basis, "suppressed": False})
        if "email_addresses" in values:
            res = self.http.request("PUT", f"{self.BASE}/objects/people/records",
                                    params={"matching_attribute": "email_addresses"},
                                    json_body={"data": {"values": values}}, headers=self.headers)
        else:
            res = self.http.post_json(f"{self.BASE}/objects/people/records", {"data": {"values": values}},
                                      headers=self.headers)
        return res["data"]["id"]["record_id"]

    def add_note(self, parent_object: str, parent_id: str, title: str, content: str) -> None:
        self.http.post_json(f"{self.BASE}/notes", {"data": {
            "parent_object": parent_object, "parent_record_id": parent_id, "title": title,
            "format": "plaintext", "content": content}}, headers=self.headers)
