import * as fs from "fs";
import * as path from "path";

interface ThemeJson {
  [key: string]: unknown;
}

function flattenTokens(
  obj: ThemeJson,
  prefix: string = "",
  result: Record<string, string> = {}
): Record<string, string> {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const cssKey = prefix ? `${prefix}-${key}` : key;

    if (typeof value === "string") {
      result[cssKey] = value;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const nested = value as ThemeJson;
      if ("size" in nested && "lineHeight" in nested) {
        result[`${cssKey}`] = nested.size as string;
        result[`${cssKey}--line-height`] = nested.lineHeight as string;
        result[`${cssKey}--letter-spacing`] = nested.letterSpacing as string;
      } else {
        flattenTokens(nested, cssKey, result);
      }
    }
  }
  return result;
}

function generateCss(): void {
  const themePath = path.resolve(__dirname, "../theme.json");
  const outputPath = path.resolve(__dirname, "../src/styles/theme-vars.generated.css");

  const theme: ThemeJson = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  const tokens = flattenTokens(theme);

  const lines: string[] = [
    "/* AUTO-GENERATED FROM theme.json — DO NOT EDIT MANUALLY */",
    "/* Run: npx tsx scripts/generate-theme-css.ts */",
    "",
    ":root {",
  ];

  for (const [key, value] of Object.entries(tokens)) {
    lines.push(`  --${key}: ${value};`);
  }

  lines.push("}");
  lines.push("");

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, lines.join("\n"), "utf-8");
  console.log(`✓ Generated ${Object.keys(tokens).length} CSS custom properties → ${outputPath}`);
}

generateCss();
