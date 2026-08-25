#!/usr/bin/env python3
"""Synchronize publication buttons and the human-editable BibTeX data file."""

from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


ROOT_PATH = Path(__file__).resolve().parents[1]
ABOUT_PATH = ROOT_PATH / "_pages" / "about.md"
DATA_PATH = ROOT_PATH / "_data" / "publication_bibtex.yml"
DATA_START = "<!-- BIBTEX_DATA_START: rendered from _data/publication_bibtex.yml -->"
DATA_END = "<!-- BIBTEX_DATA_END -->"
DATA_BLOCK_RE = re.compile(
    r"\n*<!-- BIBTEX_DATA_START:.*?<!-- BIBTEX_DATA_END -->\n*",
    re.DOTALL,
)
BUTTON_RE = re.compile(r'\s*<button\b[^>]*\bdata-bibtex-trigger\b[^>]*>BibTeX</button>')
VENUE_RE = re.compile(r"^-\s+`+([^`]+)`+\s+")
LINK_RE = re.compile(r"\[((?:Paper|Book)[^\]]*)\]\(([^)]+)\)", re.IGNORECASE)
EMPHASIS_RE = re.compile(r"\*\*\*([^*]+)\*\*\*")


@dataclass
class Publication:
    kind: str
    section_year: str
    venue_label: str
    authors: list[str]
    title: str
    citation: str
    url: str
    key: str = ""
    bibtex: str = ""


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def strip_markdown(value: str) -> str:
    value = re.sub(r"\*{1,3}", "", value)
    value = re.sub(r"`+", "", value)
    return normalize(value)


def parse_authors(value: str) -> list[str]:
    value = strip_markdown(value).strip(" .,;:，。")
    # A stray sentence stop occasionally separates the final authors in the source.
    value = re.sub(r"(?<=[a-z])\.\s+(?=[A-Z])", ", ", value)
    value = re.sub(r"\s+(?:and|&)\s+", ", ", value, flags=re.IGNORECASE)
    authors: list[str] = []
    seen: set[str] = set()

    for raw_author in re.split(r"[,，]", value):
        author = normalize(raw_author).strip(" .")
        if not author:
            continue
        fingerprint = author.casefold()
        if fingerprint in seen:
            continue
        seen.add(fingerprint)
        authors.append(author)

    return authors


def locate_title(body: str, resource_start: int) -> tuple[str, int, int]:
    candidates = []
    for match in EMPHASIS_RE.finditer(body, 0, resource_start):
        text = normalize(match.group(1))
        if (
            (len(text) >= 16 or (len(text) >= 6 and re.search(r"[^\x00-\x7f]", text)))
            and not re.search(r"award$", text, re.IGNORECASE)
        ):
            candidates.append((len(text), text, match.start(), match.end()))

    if candidates:
        _, title, start, end = max(candidates)
        return title, start, end

    # New records may omit title emphasis. Their source follows
    # "Authors. Title. Venue citation." and can be split before the venue phrase.
    plain = strip_markdown(body[:resource_start])
    match = re.match(r"^(.+?)\.\s+(.+?)\.\s+(In\s+.+|[A-Z][^.]+(?:\.|,).+)$", plain)
    if not match:
        raise ValueError(f"Unable to locate publication title: {plain}")

    title = normalize(match.group(2))
    plain_prefix = plain[: match.start(2)]
    title_start = body.find(title, len(plain_prefix) - 8)
    if title_start < 0:
        raise ValueError(f"Unable to map plain title into source: {title}")
    return title, title_start, title_start + len(title)


def parse_publication(line: str, kind: str, section_year: str) -> Publication:
    clean_line = BUTTON_RE.sub("", line).rstrip()
    venue_match = VENUE_RE.match(clean_line)
    venue_label = venue_match.group(1) if venue_match else ""
    body_start = venue_match.end() if venue_match else 2
    body = clean_line[body_start:]
    link_match = LINK_RE.search(body)
    resource_start = link_match.start() if link_match else len(body)
    title, title_start, title_end = locate_title(body, resource_start)
    authors = parse_authors(body[:title_start])
    citation = strip_markdown(body[title_end:resource_start]).strip(" .,;:，。")
    url = ""
    if link_match and link_match.group(2) != "#":
        url = link_match.group(2)

    if not authors:
        raise ValueError(f"No authors found for {title}")
    if not citation:
        raise ValueError(f"No venue citation found for {title}")

    return Publication(
        kind=kind,
        section_year=section_year,
        venue_label=normalize(venue_label),
        authors=authors,
        title=title,
        citation=citation,
        url=url,
    )


def publication_year(publication: Publication) -> str:
    years = re.findall(r"\b(?:19|20)\d{2}\b", publication.citation)
    return years[-1] if years else publication.section_year


def conference_fields(publication: Publication) -> dict[str, str]:
    text = re.sub(r"^In\s+", "", publication.citation, flags=re.IGNORECASE).strip(" .,")
    fields: dict[str, str] = {}

    pages = re.search(r"[,，]\s*(\d+\s*(?:--|-)\s*\d+)\s*$", text)
    if not pages:
        pages = re.search(r"[,，]\s*\d+(?:\([^)]+\))?\s*:\s*(\d+\s*(?:--|-)\s*\d+)\s*$", text)
    if pages:
        fields["pages"] = re.sub(r"\s*(?:--|-)\s*", "--", pages.group(1))
        text = text[: pages.start()].rstrip(" ,，")

    year = publication_year(publication)
    text = re.sub(rf"[,，]\s*{re.escape(year)}\s*$", "", text).strip(" ,，")
    fields["booktitle"] = text or publication.venue_label
    return fields


def journal_fields(publication: Publication) -> dict[str, str]:
    text = publication.citation.strip(" .,")
    fields: dict[str, str] = {}
    year = publication_year(publication)
    year_match = re.match(rf"^(.*?)[,，]\s*{re.escape(year)}(?:[,，]\s*(.*))?$", text)

    if year_match:
        fields["journal"] = year_match.group(1).strip(" ,，")
        remainder = normalize(year_match.group(2) or "")
    else:
        compact = re.match(
            r"^(.+?)\s+(\d+)(?:\(([^)]+)\))?[,，]\s*(\d+\s*(?:--|-)\s*\d+)\s*$",
            text,
        )
        if compact:
            fields["journal"] = compact.group(1)
            fields["volume"] = compact.group(2)
            if compact.group(3):
                fields["number"] = compact.group(3)
            fields["pages"] = re.sub(r"\s*(?:--|-)\s*", "--", compact.group(4))
            return fields
        fields["journal"] = text
        return fields

    if not remainder:
        return fields

    volume_pages = re.match(
        r"^(\d+)(?:\(([^)]+)\))?\s*:\s*([A-Za-z0-9]+(?:\s*(?:--|-)\s*[A-Za-z0-9]+)?)$",
        remainder,
    )
    if not volume_pages:
        volume_pages = re.match(
            r"^(\d+)(?:\(([^)]+)\))?[,，]\s*(\d+\s*(?:--|-)\s*\d+)$",
            remainder,
        )

    if volume_pages:
        fields["volume"] = volume_pages.group(1)
        if volume_pages.group(2):
            fields["number"] = volume_pages.group(2)
        fields["pages"] = re.sub(r"\s*(?:--|-)\s*", "--", volume_pages.group(3))

    return fields


def book_fields(publication: Publication) -> dict[str, str]:
    year = publication_year(publication)
    publisher = re.sub(
        rf"[,，]\s*{re.escape(year)}\s*$", "", publication.citation
    ).strip(" ,，")
    return {"publisher": publisher}


def bibtex_escape(value: str) -> str:
    replacements = {
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
    }
    return "".join(replacements.get(character, character) for character in value)


def citation_key(publication: Publication, used: set[str]) -> str:
    first_author_words = re.findall(r"[A-Za-z]+", publication.authors[0])
    author = first_author_words[-1] if first_author_words else "Book"
    stop_words = {"a", "an", "and", "for", "from", "of", "on", "the", "to", "towards", "via", "with"}
    title_words = re.findall(r"[A-Za-z][A-Za-z0-9]*", publication.title)
    title_word = next(
        (word for word in title_words if word.casefold() not in stop_words),
        "Publication",
    )
    base = f"{author}{publication_year(publication)}{title_word}"
    key = base
    suffix = 2
    while key in used:
        key = f"{base}{suffix}"
        suffix += 1
    used.add(key)
    return key


def build_bibtex(publication: Publication, used: set[str]) -> None:
    type_name = {
        "conference": "inproceedings",
        "journal": "article",
        "book": "book",
    }[publication.kind]
    fields = (
        conference_fields(publication)
        if publication.kind == "conference"
        else journal_fields(publication)
        if publication.kind == "journal"
        else book_fields(publication)
    )
    publication.key = citation_key(publication, used)
    ordered_fields: list[tuple[str, str]] = [
        ("author", " and ".join(publication.authors)),
        ("title", "{" + publication.title + "}"),
        ("booktitle", fields.get("booktitle", "")),
        ("journal", fields.get("journal", "")),
        ("publisher", fields.get("publisher", "")),
        ("year", publication_year(publication)),
        ("volume", fields.get("volume", "")),
        ("number", fields.get("number", "")),
        ("pages", fields.get("pages", "")),
    ]

    doi_match = re.search(r"10\.\d{4,9}/[^?#\s]+", publication.url)
    if doi_match:
        ordered_fields.append(("doi", doi_match.group(0).rstrip("/")))
    if publication.url:
        ordered_fields.append(("url", publication.url))

    populated = [(name, bibtex_escape(value)) for name, value in ordered_fields if value]
    lines = [f"@{type_name}{{{publication.key},"]
    lines.extend(
        f"  {name} = {{{value}}}{',' if index < len(populated) - 1 else ''}"
        for index, (name, value) in enumerate(populated)
    )
    lines.append("}")
    publication.bibtex = "\n".join(lines)


def generate(source: str) -> tuple[str, list[Publication]]:
    source = DATA_BLOCK_RE.sub("\n\n", source)

    lines = source.splitlines()
    in_publications = False
    kind = ""
    section_year = ""
    publications: list[Publication] = []
    used_keys: set[str] = set()
    output_lines: list[str] = []

    for line in lines:
        if line.startswith("# 📚 Publications"):
            in_publications = True
        elif line.startswith("# 🎖 Honors and Awards"):
            in_publications = False

        if in_publications:
            year_match = re.search(r"<summary><strong>((?:19|20)\d{2})", line)
            if year_match:
                section_year = year_match.group(1)
            if line == "### Conference Papers":
                kind = "conference"
            elif line == "### Journal Papers":
                kind = "journal"
            elif line == "### Books":
                kind = "book"
            elif line.startswith("</details>"):
                kind = ""

        if in_publications and kind and line.startswith("- "):
            publication = parse_publication(line, kind, section_year)
            build_bibtex(publication, used_keys)
            publications.append(publication)
            clean_line = BUTTON_RE.sub("", line).rstrip()
            label = html.escape(f"Show BibTeX for {publication.title}", quote=True)
            button = (
                '<button type="button" class="bibtex-trigger" data-bibtex-trigger '
                f'data-bibtex-key="{publication.key}" aria-label="{label}">BibTeX</button>'
            )
            line = f"{clean_line} {button}"

        output_lines.append(line)

    data_block = "\n".join(
        [
            DATA_START,
            '<script type="application/json" id="publication-bibtex-data">',
            "{{ site.data.publication_bibtex | jsonify }}",
            "</script>",
            DATA_END,
            "",
        ]
    )
    rendered = "\n".join(output_lines)
    marker = "# 🎖 Honors and Awards"
    rendered = re.sub(
        rf"\n*{re.escape(marker)}",
        lambda _match: f"\n\n{data_block}\n{marker}",
        rendered,
        count=1,
    )
    return rendered.rstrip() + "\n", publications


def parse_data(source: str) -> dict[str, str]:
    entries: dict[str, str] = {}
    current_key = ""
    current_lines: list[str] = []

    def store_current() -> None:
        nonlocal current_key, current_lines
        if not current_key:
            return
        if not current_lines:
            raise ValueError(f"Empty BibTeX entry for {current_key}")
        entries[current_key] = "\n".join(current_lines)
        current_key = ""
        current_lines = []

    for line in source.splitlines():
        key_match = re.fullmatch(r"([A-Za-z0-9]+): \|-", line)
        if key_match:
            store_current()
            current_key = key_match.group(1)
        elif current_key and line.startswith("  "):
            current_lines.append(line[2:])
        elif current_key and not line.strip():
            store_current()
        elif current_key:
            raise ValueError(f"Invalid indentation in BibTeX entry {current_key}: {line}")

    store_current()
    return entries


def render_merged_data(
    publications: list[Publication], existing_entries: dict[str, str]
) -> str:
    lines = [
        "# Human-editable BibTeX records used by the buttons on _pages/about.md.",
        "# Keep each YAML key in sync with the corresponding data-bibtex-key.",
        "# Use the literal block format below so every BibTeX field stays readable.",
        "# The sync script preserves existing records and only generates missing ones.",
        "",
    ]

    for publication in publications:
        bibtex = existing_entries.get(publication.key, publication.bibtex)
        lines.append(f"{publication.key}: |-")
        lines.extend(f"  {line}" for line in bibtex.splitlines())
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def validate(publications: list[Publication]) -> None:
    if not publications:
        raise ValueError("No publications found")
    keys = {publication.key for publication in publications}
    if len(keys) != len(publications):
        raise ValueError("Duplicate BibTeX keys generated")

    for publication in publications:
        if len(publication.authors) != len({author.casefold() for author in publication.authors}):
            raise ValueError(f"Duplicate author in {publication.key}")
        type_field = "booktitle" if publication.kind == "conference" else "journal" if publication.kind == "journal" else "publisher"
        for required in ("author", "title", type_field, "year"):
            if not re.search(rf"^  {required} = \{{.+\}},?$", publication.bibtex, re.MULTILINE):
                raise ValueError(f"Missing or empty {required} in {publication.key}")
        if not re.search(r"^  title = \{\{.+\}\},?$", publication.bibtex, re.MULTILINE):
            raise ValueError(f"Title is not protected with double braces in {publication.key}")


def validate_data(publications: list[Publication], entries: dict[str, str]) -> None:
    expected_keys = {publication.key for publication in publications}
    actual_keys = set(entries)
    if expected_keys != actual_keys:
        missing = sorted(expected_keys - actual_keys)
        extra = sorted(actual_keys - expected_keys)
        raise ValueError(f"BibTeX key mismatch; missing={missing}, extra={extra}")

    for publication in publications:
        bibtex = entries[publication.key]
        type_name = {
            "conference": "inproceedings",
            "journal": "article",
            "book": "book",
        }[publication.kind]
        if not bibtex.startswith(f"@{type_name}{{{publication.key},\n"):
            raise ValueError(f"Entry type or citation key mismatch in {publication.key}")

        type_field = "booktitle" if publication.kind == "conference" else "journal" if publication.kind == "journal" else "publisher"
        for required in ("author", "title", type_field, "year"):
            if not re.search(rf"^  {required} = \{{.+\}},?$", bibtex, re.MULTILINE):
                raise ValueError(f"Missing or empty {required} in stored entry {publication.key}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Verify that about.md is synchronized")
    args = parser.parse_args()
    source = ABOUT_PATH.read_text(encoding="utf-8")
    rendered, publications = generate(source)
    validate(publications)
    current_data = DATA_PATH.read_text(encoding="utf-8") if DATA_PATH.exists() else ""
    existing_entries = parse_data(current_data) if current_data else {}
    rendered_data = render_merged_data(publications, existing_entries)
    merged_entries = parse_data(rendered_data)
    validate_data(publications, merged_entries)

    if args.check:
        if rendered != source or rendered_data != current_data:
            raise SystemExit("Publication buttons or BibTeX data are out of sync; run this script without --check")
        print(f"Validated {len(publications)} publication buttons and BibTeX entries")
        return

    ABOUT_PATH.write_text(rendered, encoding="utf-8")
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(rendered_data, encoding="utf-8")
    print(f"Updated {len(publications)} publication buttons in {ABOUT_PATH}")
    print(f"Wrote readable BibTeX records to {DATA_PATH}")


if __name__ == "__main__":
    main()
