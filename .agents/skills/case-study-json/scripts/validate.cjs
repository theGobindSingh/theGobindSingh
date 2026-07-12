#!/usr/bin/env node
/**
 * Structural validator for a case-study JSON file against references/schema.md.
 *
 * Usage: node validate.js <path-to-case-study.json>
 *
 * Exits 0 with a success line on success. Exits 1 and prints one "ERROR:" line per
 * problem on failure. Also prints non-fatal "WARNING:" lines if any of the five
 * conventional sections seem to be missing, without affecting the exit code.
 *
 * Mirrors validate.py exactly — keep the two in sync if either changes.
 */

const fs = require("fs");

const CATEGORY_VALUES = new Set([
  "build",
  "rebuild",
  "integration",
  "frontend",
]);
const SECTION_VARIANTS = new Set(["default", "dim", "inverted"]);
const SECTION_LAYOUTS = new Set(["standard", "full-width"]);
const PARA_VARIANTS = new Set(["body", "lead"]);
const IMAGE_ASPECTS = new Set(["square", "video"]);
const CONTAINER_COLS = new Set([1, 2, 3]);

const EXPECTED_SECTION_TITLES = [
  "the problem",
  "the approach",
  "challenges",
  "impact & results",
  "learnings",
];

function isStr(v) {
  return typeof v === "string";
}

function isPlainObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pushError(errors, path, msg) {
  errors.push(`${path}: ${msg}`);
}

const BLOCK_VALIDATORS = {
  para: (b, path, errors) => {
    if (!isStr(b.src)) pushError(errors, path, "para.src must be a string");
    if (b.variant !== undefined && !PARA_VARIANTS.has(b.variant)) {
      pushError(
        errors,
        path,
        `para.variant '${b.variant}' not in ${[...PARA_VARIANTS]}`,
      );
    }
  },
  "numbered-list": validateStringList,
  "bullet-list": validateStringList,
  "chip-list": validateStringList,
  eyebrow: (b, path, errors) => {
    if (!isStr(b.src)) pushError(errors, path, "eyebrow.src must be a string");
    if (b.icon !== undefined && !isStr(b.icon)) {
      pushError(errors, path, "eyebrow.icon must be a string if present");
    }
  },
  h3: (b, path, errors) => {
    if (!isStr(b.src)) pushError(errors, path, "h3.src must be a string");
  },
  code: (b, path, errors) => {
    if (!isStr(b.src)) pushError(errors, path, "code.src must be a string");
    if (b.language !== undefined && !isStr(b.language)) {
      pushError(errors, path, "code.language must be a string if present");
    }
  },
  image: (b, path, errors) => {
    if (!isStr(b.src)) pushError(errors, path, "image.src must be a string");
    if (!isStr(b.alt))
      pushError(errors, path, "image.alt is required and must be a string");
    if (b.aspect !== undefined && !IMAGE_ASPECTS.has(b.aspect)) {
      pushError(
        errors,
        path,
        `image.aspect '${b.aspect}' not in ${[...IMAGE_ASPECTS]}`,
      );
    }
  },
  "simple-card": (b, path, errors) => {
    const src = b.src;
    if (!isPlainObject(src)) {
      pushError(errors, path, "simple-card.src must be an object");
      return;
    }
    if (!isStr(src.title))
      pushError(errors, path, "simple-card.src.title must be a string");
    if (!isStr(src.desc))
      pushError(errors, path, "simple-card.src.desc must be a string");
    if (src.chip !== undefined && !isStr(src.chip)) {
      pushError(
        errors,
        path,
        "simple-card.src.chip must be a string if present",
      );
    }
  },
  stat: (b, path, errors) => {
    const src = b.src;
    if (!isPlainObject(src)) {
      pushError(errors, path, "stat.src must be an object");
      return;
    }
    if (!isStr(src.value))
      pushError(errors, path, "stat.src.value must be a string");
    if (!isStr(src.label))
      pushError(errors, path, "stat.src.label must be a string");
  },
  signature: (b, path, errors) => {
    const src = b.src;
    if (!isPlainObject(src)) {
      pushError(errors, path, "signature.src must be an object");
      return;
    }
    if (!isStr(src.name))
      pushError(errors, path, "signature.src.name must be a string");
    if (!isStr(src.role))
      pushError(errors, path, "signature.src.role must be a string");
    if (src.image !== undefined) {
      const img = src.image;
      if (!isPlainObject(img) || !isStr(img.src) || !isStr(img.alt)) {
        pushError(
          errors,
          path,
          "signature.src.image must be { src, alt } if present",
        );
      }
    }
  },
  container: (b, path, errors) => {
    if (b.cols !== undefined && !CONTAINER_COLS.has(b.cols)) {
      pushError(
        errors,
        path,
        `container.cols '${b.cols}' not in ${[...CONTAINER_COLS]}`,
      );
    }
    if (!Array.isArray(b.items)) {
      pushError(errors, path, "container.items must be a list");
      return;
    }
    b.items.forEach((item, i) =>
      validateBlock(item, `${path}.items[${i}]`, errors),
    );
  },
};

function validateStringList(b, path, errors) {
  const src = b.src;
  if (!Array.isArray(src) || !src.every(isStr)) {
    pushError(errors, path, "src must be a list of strings");
  }
}

function validateBlock(block, path, errors) {
  if (!isPlainObject(block)) {
    pushError(errors, path, "block must be an object");
    return;
  }
  const btype = block.type;
  if (!isStr(btype)) {
    pushError(errors, path, "block missing string 'type'");
    return;
  }
  const validator = BLOCK_VALIDATORS[btype];
  if (!validator) {
    pushError(errors, path, `unknown block type '${btype}'`);
    return;
  }
  validator(block, path, errors);
}

function validateTimeframe(tf, path, errors) {
  if (!isPlainObject(tf)) {
    pushError(errors, path, "timeframe must be an object");
    return;
  }
  if (!isStr(tf.start))
    pushError(errors, path, "timeframe.start must be an ISO date string");
  if (tf.end !== null && tf.end !== undefined && !isStr(tf.end)) {
    pushError(errors, path, "timeframe.end must be a string or null");
  }
}

function validateSection(section, path, errors) {
  if (!isPlainObject(section)) {
    pushError(errors, path, "section must be an object");
    return;
  }
  if (!isStr(section.sectionTitle))
    pushError(errors, path, "sectionTitle must be a string");
  if (section.title !== undefined && !isStr(section.title)) {
    pushError(errors, path, "title must be a string if present");
  }
  if (section.variant !== undefined && !SECTION_VARIANTS.has(section.variant)) {
    pushError(
      errors,
      path,
      `variant '${section.variant}' not in ${[...SECTION_VARIANTS]}`,
    );
  }
  if (section.layout !== undefined && !SECTION_LAYOUTS.has(section.layout)) {
    pushError(
      errors,
      path,
      `layout '${section.layout}' not in ${[...SECTION_LAYOUTS]}`,
    );
  }
  if (!Array.isArray(section.items)) {
    pushError(errors, path, "items must be a list");
    return;
  }
  section.items.forEach((item, i) =>
    validateBlock(item, `${path}.items[${i}]`, errors),
  );
}

function validate(data) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(data)) {
    return { errors: ["root: must be a JSON object"], warnings };
  }

  for (const field of ["title", "description", "role"]) {
    if (!isStr(data[field])) {
      pushError(errors, "root", `'${field}' is required and must be a string`);
    }
  }

  if (!("client" in data)) {
    pushError(errors, "root", "'client' is required (string or null)");
  } else if (data.client !== null && !isStr(data.client)) {
    pushError(errors, "root", "'client' must be a string or null");
  }

  if (!CATEGORY_VALUES.has(data.category)) {
    pushError(
      errors,
      "root",
      `'category' must be one of ${[...CATEGORY_VALUES]}, got ${JSON.stringify(data.category)}`,
    );
  }

  if (!Array.isArray(data.stack) || !data.stack.every(isStr)) {
    pushError(
      errors,
      "root",
      "'stack' is required and must be a list of strings",
    );
  }

  if (!("timeframe" in data)) {
    pushError(errors, "root", "'timeframe' is required");
  } else {
    validateTimeframe(data.timeframe, "root.timeframe", errors);
  }

  if ("coverImage" in data && !isStr(data.coverImage)) {
    pushError(errors, "root", "'coverImage' must be a string if present");
  }

  if ("featured" in data && typeof data.featured !== "boolean") {
    pushError(errors, "root", "'featured' must be a boolean if present");
  }

  if ("order" in data && typeof data.order !== "number") {
    pushError(errors, "root", "'order' must be a number if present");
  }

  const sections = data.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    pushError(
      errors,
      "root",
      "'sections' is required and must be a non-empty list",
    );
  } else {
    sections.forEach((section, i) =>
      validateSection(section, `root.sections[${i}]`, errors),
    );

    const foundTitles = new Set(
      sections
        .filter(isPlainObject)
        .map((s) =>
          isStr(s.sectionTitle) ? s.sectionTitle.trim().toLowerCase() : "",
        ),
    );
    const missing = EXPECTED_SECTION_TITLES.filter((t) => !foundTitles.has(t));
    if (missing.length > 0) {
      warnings.push(
        `expected sections not found (case-insensitive match on sectionTitle): ${missing.join(", ")}`,
      );
    }
  }

  return { errors, warnings };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("usage: validate.js <path-to-case-study.json>");
    process.exit(2);
  }

  const path = args[0];
  let raw;
  try {
    raw = fs.readFileSync(path, "utf-8");
  } catch (e) {
    console.log(`could not read file: ${e.message}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.log(`invalid JSON: ${e.message}`);
    process.exit(1);
  }

  const { errors, warnings } = validate(data);

  for (const w of warnings) console.log(`WARNING: ${w}`);

  if (errors.length > 0) {
    for (const e of errors) console.log(`ERROR: ${e}`);
    process.exit(1);
  }

  console.log(`OK: ${path} is a valid case study`);
  process.exit(0);
}

main();
