import datetime as dt
import tempfile
import unittest
from pathlib import Path

from leadgen import compliance, patterns
from leadgen.config import Settings
from leadgen.models import Candidate, Company
from leadgen.pipeline import Pipeline
from leadgen.quota import Quota, QuotaExceeded
from leadgen.sources import parse_form_d

FORM_D = """<?xml version="1.0"?>
<edgarSubmission><offeringData/>
 <relatedPersonsList>
  <relatedPersonInfo>
   <relatedPersonName><firstName>JANE</firstName><lastName>DOE</lastName></relatedPersonName>
   <relatedPersonAddress><stateOrCountry>CA</stateOrCountry></relatedPersonAddress>
   <relatedPersonRelationshipList><relationship>Executive Officer</relationship>
     <relationship>Director</relationship></relatedPersonRelationshipList>
   <relationshipClarification>CEO</relationshipClarification>
  </relatedPersonInfo>
  <relatedPersonInfo>
   <relatedPersonName><firstName>Sam</firstName><lastName>Vc</lastName></relatedPersonName>
   <relatedPersonAddress><stateOrCountry>X0</stateOrCountry></relatedPersonAddress>
   <relatedPersonRelationshipList><relationship>Director</relationship></relatedPersonRelationshipList>
  </relatedPersonInfo>
 </relatedPersonsList>
</edgarSubmission>"""


class FakeHttp:
    """Routes by URL substring; records calls."""

    def __init__(self, routes):
        self.routes, self.calls = routes, []

    def request(self, method, url, params=None, headers=None, json_body=None, auth=None, cache=False,
                as_text=False):
        self.calls.append((method, url, params))
        for frag, resp in self.routes.items():
            if frag in url:
                return resp(params) if callable(resp) else resp
        raise Exception(f"unrouted {url}")

    def get_json(self, url, **kw):
        return self.request("GET", url, **kw)

    def get_text(self, url, **kw):
        return self.request("GET", url, as_text=True, **kw)

    def post_json(self, url, body, **kw):
        return self.request("POST", url, json_body=body, **kw)


def settings(tmp, **kw):
    s = Settings(data_dir=Path(tmp), sec_user_agent="DataDrop test@example.com", **kw)
    return s


class Compliance(unittest.TestCase):
    def test_lawful_basis(self):
        co = Company("X", "x.com", "US")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b", country="US"), co), "US opt-out")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b", country="United Kingdom"), co), "UK corporate")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b", country="Germany"), co), "Do not email")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b", country="FR"), co), "EU legitimate interest")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b"), co), "Do not email")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b"), co, infer_from_company=True), "US opt-out")
        self.assertEqual(compliance.lawful_basis(Candidate("a", "b"), Company("Y", hq_country="DE"), True),
                         "Do not email")

    def test_email_filters(self):
        co = Company("X", "x.com")
        self.assertFalse(compliance.acceptable_email("jane@gmail.com", co)[0])
        self.assertFalse(compliance.acceptable_email("jane@other.com", co)[0])
        self.assertTrue(compliance.acceptable_email("jane@x.com", co)[0])
        self.assertTrue(compliance.is_blocked_source("https://www.linkedin.com/in/x"))
        self.assertFalse(compliance.company_allowed(Company("G", hq_country="Germany")))


class Patterns(unittest.TestCase):
    def test_infer_and_render(self):
        ex = [("Jane", "Doe", "jane.doe@x.com"), ("Bob", "Ray", "bob.ray@x.com")]
        self.assertEqual(patterns.infer(ex), "{first}.{last}")
        self.assertEqual(patterns.render("{f}{last}", "José", "Núñez", "x.com"), "jnunez@x.com")
        self.assertEqual(patterns.candidates("Jane", "Doe", "x.com", known="{first}", limit=1), ["jane@x.com"])


class QuotaTest(unittest.TestCase):
    def test_caps(self):
        with tempfile.TemporaryDirectory() as d:
            q = Quota(Path(d) / "q.json", {"hunter.search": 1}, today=dt.date(2026, 10, 14))
            q.spend("hunter.search")
            self.assertRaises(QuotaExceeded, q.spend, "hunter.search")
            self.assertEqual(Quota(Path(d) / "q.json", {"hunter.search": 1},
                                   today=dt.date(2026, 11, 1)).remaining("hunter.search"), 1)


class FormD(unittest.TestCase):
    def test_parse(self):
        people = parse_form_d(FORM_D, "sec")
        self.assertEqual(people[0].full_name, "Jane Doe")
        self.assertIn("CEO", people[0].title)
        self.assertEqual(people[0].country, "US")
        self.assertIsNone(people[1].country)


class PipelineTest(unittest.TestCase):
    def routes(self, verify_status="valid"):
        return {
            "efts.sec.gov": {"hits": {"hits": [{"_source": {
                "ciks": ["0001234"], "display_names": ["Acme Labs Inc  (CIK 0001234)"],
                "adsh": "0001234-22-000001", "file_date": "2022-01-01"}}]}},
            "primary_doc.xml": FORM_D,
            "dns.google": {"Answer": [{"type": 15, "data": "10 mx.acme.com."}]},
            "robots.txt": "User-agent: *\nDisallow: /private",
            "acme.com/": "<a href='mailto:jane.doe@acme.com'>Jane</a> info@acme.com",
            "emailverifier.reoon.com": {"status": "safe" if verify_status == "valid" else verify_status},
            "api.hunter.io/v2/domain-search": {"data": {"pattern": "{first}", "emails": []}},
            "api.tomba.io/v1/email-finder": {"data": {"email": "jane@acme.com", "score": 90,
                                                       "verification": {"status": "valid"}}},
        }

    def test_free_path_pattern_from_website(self):
        with tempfile.TemporaryDirectory() as d:
            http = FakeHttp(self.routes())
            p = Pipeline(settings(d, reoon_key="k", hunter_key="h"), http=http)
            r = p.enrich(Company("Acme Labs", "acme.com", "US"))
            jane = r.people[0]
            self.assertEqual(r.pattern, "{first}.{last}")
            self.assertEqual(jane.email, "jane.doe@acme.com")
            self.assertEqual(jane.email_status, "valid")
            # Pattern came free from the website, so no Hunter credit was spent.
            self.assertEqual(p.quota.used("hunter.search"), 0)
            self.assertFalse(any("hunter" in c[1] for c in http.calls))
            # The VC director (no title keyword beyond Director) is still a candidate but ranked lower.
            self.assertEqual([c.full_name for c in r.people][0], "Jane Doe")

    def test_catch_all_falls_through_to_finder(self):
        with tempfile.TemporaryDirectory() as d:
            routes = self.routes(verify_status="catch_all")
            routes["acme.com/"] = "nothing here"
            http = FakeHttp(routes)
            p = Pipeline(settings(d, reoon_key="k", tomba_key="t", tomba_secret="s"), http=http)
            r = p.enrich(Company("Acme Labs", "acme.com", "US"))
            jane = r.people[0]
            self.assertEqual(jane.email, "jane@acme.com")
            self.assertEqual(jane.email_source, "tomba")
            self.assertEqual(jane.email_status, "valid")

    def test_dead_mail_domain_skips_email_spend(self):
        with tempfile.TemporaryDirectory() as d:
            routes = self.routes()
            routes["dns.google"] = {"Answer": []}
            http = FakeHttp(routes)
            p = Pipeline(settings(d, reoon_key="k", tomba_key="t", tomba_secret="s"), http=http)
            r = p.enrich(Company("Acme Labs", "acme.com", "US"))
            self.assertTrue(any("no MX" in n for n in r.notes))
            self.assertEqual(p.quota.used("tomba.search") + p.quota.used("reoon.verify"), 0)
            self.assertIsNone(r.people[0].email)

    def test_germany_skipped_and_suppressed_excluded(self):
        with tempfile.TemporaryDirectory() as d:
            p = Pipeline(settings(d), http=FakeHttp(self.routes()))
            self.assertEqual(p.enrich(Company("G", "g.de", "DE")).people, [])
            sup = Candidate("Jane", "Doe", title="CEO", notes=["SUPPRESSED"], sources=["attio"])
            r = p.enrich(Company("Acme Labs", None, "UK"), existing=[sup])
            self.assertEqual(r.people, [])

    def test_webmail_from_finder_is_dropped(self):
        with tempfile.TemporaryDirectory() as d:
            routes = self.routes(verify_status="invalid")
            routes["acme.com/"] = ""
            routes["api.tomba.io/v1/email-finder"] = {"data": {"email": "jane@gmail.com",
                                                               "verification": {"status": "valid"}}}
            p = Pipeline(settings(d, reoon_key="k", tomba_key="t", tomba_secret="s"), http=FakeHttp(routes))
            jane = p.enrich(Company("Acme Labs", "acme.com", "US")).people[0]
            self.assertIsNone(jane.email)
            self.assertTrue(any("personal webmail" in n for n in jane.notes))


if __name__ == "__main__":
    unittest.main()
