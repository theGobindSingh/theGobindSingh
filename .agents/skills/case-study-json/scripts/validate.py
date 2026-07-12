#!/usr/bin/env python3
"""Structural validator for a case-study JSON file against references/schema.md.

Usage: python3 validate.py <path-to-case-study.json>

Exits 0 with no output on success. Exits 1 and prints one error per line on failure.
Also prints non-fatal warnings (e.g. missing conventional sections) to stderr-style
lines prefixed with "WARNING:" without affecting the exit code.
"""

import json
import sys

CATEGORY_VALUES = {"build", "rebuild", "integration", "frontend"}
SECTION_VARIANTS = {"default", "dim", "inverted"}
SECTION_LAYOUTS = {"standard", "full-width"}
PARA_VARIANTS = {"body", "lead"}
IMAGE_ASPECTS = {"square", "video"}
CONTAINER_COLS = {1, 2, 3}

EXPECTED_SECTION_TITLES = [
    "the problem",
    "the approach",
    "challenges",
    "impact & results",
    "learnings",
]

BLOCK_VALIDATORS = {}


def error(errors, path, msg):
    errors.append(f"{path}: {msg}")


def is_str(v):
    return isinstance(v, str)


def validate_block(block, path, errors):
    if not isinstance(block, dict):
        error(errors, path, "block must be an object")
        return
    btype = block.get("type")
    if not is_str(btype):
        error(errors, path, "block missing string 'type'")
        return
    validator = BLOCK_VALIDATORS.get(btype)
    if validator is None:
        error(errors, path, f"unknown block type '{btype}'")
        return
    validator(block, path, errors)


def v_para(b, path, errors):
    if not is_str(b.get("src")):
        error(errors, path, "para.src must be a string")
    variant = b.get("variant")
    if variant is not None and variant not in PARA_VARIANTS:
        error(errors, path, f"para.variant '{variant}' not in {PARA_VARIANTS}")


def v_list(b, path, errors):
    src = b.get("src")
    if not isinstance(src, list) or not all(is_str(x) for x in src):
        error(errors, path, "src must be a list of strings")


def v_eyebrow(b, path, errors):
    if not is_str(b.get("src")):
        error(errors, path, "eyebrow.src must be a string")
    icon = b.get("icon")
    if icon is not None and not is_str(icon):
        error(errors, path, "eyebrow.icon must be a string if present")


def v_h3(b, path, errors):
    if not is_str(b.get("src")):
        error(errors, path, "h3.src must be a string")


def v_code(b, path, errors):
    if not is_str(b.get("src")):
        error(errors, path, "code.src must be a string")
    language = b.get("language")
    if language is not None and not is_str(language):
        error(errors, path, "code.language must be a string if present")


def v_image(b, path, errors):
    if not is_str(b.get("src")):
        error(errors, path, "image.src must be a string")
    if not is_str(b.get("alt")):
        error(errors, path, "image.alt is required and must be a string")
    aspect = b.get("aspect")
    if aspect is not None and aspect not in IMAGE_ASPECTS:
        error(errors, path, f"image.aspect '{aspect}' not in {IMAGE_ASPECTS}")


def v_simple_card(b, path, errors):
    src = b.get("src")
    if not isinstance(src, dict):
        error(errors, path, "simple-card.src must be an object")
        return
    if not is_str(src.get("title")):
        error(errors, path, "simple-card.src.title must be a string")
    if not is_str(src.get("desc")):
        error(errors, path, "simple-card.src.desc must be a string")
    chip = src.get("chip")
    if chip is not None and not is_str(chip):
        error(errors, path, "simple-card.src.chip must be a string if present")


def v_stat(b, path, errors):
    src = b.get("src")
    if not isinstance(src, dict):
        error(errors, path, "stat.src must be an object")
        return
    if not is_str(src.get("value")):
        error(errors, path, "stat.src.value must be a string")
    if not is_str(src.get("label")):
        error(errors, path, "stat.src.label must be a string")


def v_signature(b, path, errors):
    src = b.get("src")
    if not isinstance(src, dict):
        error(errors, path, "signature.src must be an object")
        return
    if not is_str(src.get("name")):
        error(errors, path, "signature.src.name must be a string")
    if not is_str(src.get("role")):
        error(errors, path, "signature.src.role must be a string")
    image = src.get("image")
    if image is not None:
        if not isinstance(image, dict) or not is_str(image.get("src")) or not is_str(
            image.get("alt")
        ):
            error(errors, path, "signature.src.image must be { src, alt } if present")


def v_container(b, path, errors):
    cols = b.get("cols")
    if cols is not None and cols not in CONTAINER_COLS:
        error(errors, path, f"container.cols '{cols}' not in {CONTAINER_COLS}")
    items = b.get("items")
    if not isinstance(items, list):
        error(errors, path, "container.items must be a list")
        return
    for i, item in enumerate(items):
        validate_block(item, f"{path}.items[{i}]", errors)


BLOCK_VALIDATORS.update(
    {
        "para": v_para,
        "numbered-list": v_list,
        "bullet-list": v_list,
        "eyebrow": v_eyebrow,
        "h3": v_h3,
        "code": v_code,
        "image": v_image,
        "simple-card": v_simple_card,
        "chip-list": v_list,
        "stat": v_stat,
        "signature": v_signature,
        "container": v_container,
    }
)


def validate_section(section, path, errors):
    if not isinstance(section, dict):
        error(errors, path, "section must be an object")
        return
    if not is_str(section.get("sectionTitle")):
        error(errors, path, "sectionTitle must be a string")
    title = section.get("title")
    if title is not None and not is_str(title):
        error(errors, path, "title must be a string if present")
    variant = section.get("variant")
    if variant is not None and variant not in SECTION_VARIANTS:
        error(errors, path, f"variant '{variant}' not in {SECTION_VARIANTS}")
    layout = section.get("layout")
    if layout is not None and layout not in SECTION_LAYOUTS:
        error(errors, path, f"layout '{layout}' not in {SECTION_LAYOUTS}")
    items = section.get("items")
    if not isinstance(items, list):
        error(errors, path, "items must be a list")
        return
    for i, item in enumerate(items):
        validate_block(item, f"{path}.items[{i}]", errors)


def validate_timeframe(tf, path, errors):
    if not isinstance(tf, dict):
        error(errors, path, "timeframe must be an object")
        return
    if not is_str(tf.get("start")):
        error(errors, path, "timeframe.start must be an ISO date string")
    end = tf.get("end")
    if end is not None and not is_str(end):
        error(errors, path, "timeframe.end must be a string or null")


def validate(data):
    errors = []
    warnings = []

    if not isinstance(data, dict):
        return ["root: must be a JSON object"], warnings

    for field in ("title", "description", "role"):
        if not is_str(data.get(field)):
            error(errors, "root", f"'{field}' is required and must be a string")

    if "client" in data and data["client"] is not None and not is_str(data["client"]):
        error(errors, "root", "'client' must be a string or null")
    elif "client" not in data:
        error(errors, "root", "'client' is required (string or null)")

    category = data.get("category")
    if category not in CATEGORY_VALUES:
        error(errors, "root", f"'category' must be one of {CATEGORY_VALUES}, got {category!r}")

    stack = data.get("stack")
    if not isinstance(stack, list) or not all(is_str(x) for x in stack):
        error(errors, "root", "'stack' is required and must be a list of strings")

    if "timeframe" not in data:
        error(errors, "root", "'timeframe' is required")
    else:
        validate_timeframe(data["timeframe"], "root.timeframe", errors)

    for optional_str_field in ("coverImage",):
        if optional_str_field in data and not is_str(data[optional_str_field]):
            error(errors, "root", f"'{optional_str_field}' must be a string if present")

    if "featured" in data and not isinstance(data["featured"], bool):
        error(errors, "root", "'featured' must be a boolean if present")

    if "order" in data and not isinstance(data["order"], (int, float)):
        error(errors, "root", "'order' must be a number if present")

    sections = data.get("sections")
    if not isinstance(sections, list) or len(sections) == 0:
        error(errors, "root", "'sections' is required and must be a non-empty list")
    else:
        for i, section in enumerate(sections):
            validate_section(section, f"root.sections[{i}]", errors)

        found_titles = {
            s.get("sectionTitle", "").strip().lower()
            for s in sections
            if isinstance(s, dict)
        }
        missing = [t for t in EXPECTED_SECTION_TITLES if t not in found_titles]
        if missing:
            warnings.append(
                "expected sections not found (case-insensitive match on sectionTitle): "
                + ", ".join(missing)
            )

    return errors, warnings


def main():
    if len(sys.argv) != 2:
        print("usage: validate.py <path-to-case-study.json>", file=sys.stderr)
        sys.exit(2)

    path = sys.argv[1]
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"invalid JSON: {e}")
        sys.exit(1)
    except OSError as e:
        print(f"could not read file: {e}")
        sys.exit(1)

    errors, warnings = validate(data)

    for w in warnings:
        print(f"WARNING: {w}")

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        sys.exit(1)

    print(f"OK: {path} is a valid case study")
    sys.exit(0)


if __name__ == "__main__":
    main()
