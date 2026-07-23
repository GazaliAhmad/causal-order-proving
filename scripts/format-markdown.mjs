import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const roots = ["README.md", "TESTLOG.md", "docs", "proposals"];

async function collectMarkdownFiles(entryPath) {
  const entry = await readdirOrFile(entryPath);
  if (entry.type === "file") {
    return entryPath.endsWith(".md") ? [entryPath] : [];
  }

  const files = [];
  for (const child of entry.children) {
    files.push(...(await collectMarkdownFiles(path.join(entryPath, child))));
  }
  return files;
}

async function readdirOrFile(entryPath) {
  try {
    const children = await readdir(entryPath);
    return { type: "directory", children };
  } catch {
    return { type: "file" };
  }
}

function isFence(line) {
  return /^\s*(`{3,}|~{3,})/u.test(line);
}

function isStandalone(line) {
  return (
    /^\s*#{1,6}\s/u.test(line) ||
    /^\s*\|/u.test(line) ||
    /^\s*(?:---+|\*\*\*+|___+)\s*$/u.test(line) ||
    /^\s*\[[^\]]+\]:\s/u.test(line) ||
    /^\s*</u.test(line)
  );
}

function isListItem(line) {
  return /^\s*(?:[-*+]|\d+[.)])\s+/u.test(line);
}

function reflowMarkdown(source) {
  const lines = source.replace(/\r\n?/gu, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let inFence = false;

  function flushParagraph() {
    if (paragraph.length === 0) {
      return;
    }
    const [first, ...rest] = paragraph;
    output.push([first.trimEnd(), ...rest.map((line) => line.trim())].join(" "));
    paragraph = [];
  }

  for (const line of lines) {
    if (isFence(line)) {
      flushParagraph();
      output.push(line);
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      output.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      if (output.at(-1) !== "") {
        output.push("");
      }
      continue;
    }

    if (isStandalone(line)) {
      flushParagraph();
      output.push(line.trimEnd());
      continue;
    }

    if (isListItem(line)) {
      flushParagraph();
      paragraph.push(line);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  while (output.at(-1) === "") {
    output.pop();
  }
  return `${output.join("\n")}\n`;
}

const files = (
  await Promise.all(roots.map((root) => collectMarkdownFiles(root)))
).flat();

for (const file of files) {
  const source = await readFile(file, "utf8");
  const formatted = reflowMarkdown(source);
  if (formatted !== source.replace(/\r\n?/gu, "\n")) {
    await writeFile(file, formatted, "utf8");
    console.log(`formatted ${file}`);
  }
}
