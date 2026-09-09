"""Verify the production export: run npm run build, then this script."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, urljoin, unquote
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
ORIGIN = "https://smsbuddy.lk"


class Page(HTMLParser):
    def __init__(self, file):
        super().__init__()
        self.ids, self.links, self.canonical, self.schema = set(), [], [], []
        self.meta, self.title, self.h1, self.main = {}, "", 0, 0
        self.in_title, self.in_schema, self.schema_text = False, False, ""
        self.feed(file.read_text())

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical.append(a["href"])
        if tag == "meta":
            self.meta[a.get("name", a.get("property"))] = a.get("content", "")
        self.h1 += tag == "h1"
        self.main += tag == "main"
        if tag == "title":
            self.in_title = True
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_schema, self.schema_text = True, ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.in_schema:
            self.schema_text += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.in_schema:
            self.schema.append(json.loads(self.schema_text))
            self.in_schema = False


def file_for(path):
    return OUT / (path.strip("/") + ".html" if path.strip("/") else "index.html")


urls = [node.text for node in ElementTree.parse(OUT / "sitemap.xml").iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
assert len(urls) == len(set(urls)) == 8, "Unexpected or duplicate sitemap entries"
assert not any("get-started" in url for url in urls), "Noindex handoff in sitemap"
pages = {url: Page(file_for(urlsplit(url).path)) for url in urls}
assert len({p.title for p in pages.values()}) == len(pages), "Duplicate titles"
assert len({p.meta.get("description") for p in pages.values()}) == len(pages), "Duplicate descriptions"
for url, page in pages.items():
    assert len(page.canonical) == 1 and page.canonical[0].rstrip("/") == url.rstrip("/"), (url, "canonical")
    assert "noindex" not in page.meta.get("robots", ""), (url, "noindex")
    assert page.h1 == page.main == 1 and "main-content" in page.ids, (url, "landmarks")
    assert page.meta.get("og:url", "").rstrip("/") == url.rstrip("/"), (url, "social URL")
    assert page.meta.get("og:description") == page.meta.get("description"), (url, "social description")
    for key in ["og:image", "twitter:image"]:
        assert (OUT / urlsplit(page.meta[key]).path.lstrip("/")).is_file(), (url, key)
    types = {node["@type"] for data in page.schema for node in data.get("@graph", [])}
    assert {"Organization", "WebSite"} <= types, (url, "identity schema")
    for href in page.links:
        target = urlsplit(urljoin(url, href))
        if target.netloc != "smsbuddy.lk":
            continue
        file = file_for(target.path)
        assert file.is_file(), (url, "broken link", href)
        if target.fragment:
            assert unquote(target.fragment) in Page(file).ids, (url, "missing fragment", href)
    assert "https://portal.smsbuddy.lk/register" in page.links, (url, "signup link")

handoff = Page(OUT / "get-started.html")
assert "noindex" in handoff.meta.get("robots", ""), "Handoff must remain noindex"
error = Page(OUT / "404.html")
assert "noindex" in error.meta.get("robots", "") and not error.canonical, "Error indexing metadata"
assert error.main == 1 and "main-content" in error.ids, "Error skip link"
assert "Sitemap: https://smsbuddy.lk/sitemap.xml" in (OUT / "robots.txt").read_text()
assert (OUT / "brand/buddy-b.png").is_file()
for url in urls:
    assert "smsbuddy-design-contract" not in file_for(urlsplit(url).path).read_text()
print(json.dumps({"result": "PASS", "indexable_pages": len(urls), "checks": ["unique metadata", "canonicals", "social images", "identity JSON-LD", "internal links and fragments", "signup destinations", "sitemap", "noindex handoff and error", "main landmarks"]}, indent=2))
