import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const manifest = await readJson('package.json');
const contributions = manifest.contributes?.themes;
const color = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const opaqueColor = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;

assert.ok(Array.isArray(contributions) && contributions.length, 'Register themes in contributes.themes.');
assert.equal(new Set(contributions.map(({ label }) => label)).size, contributions.length, 'Theme labels must be unique.');
assert.equal(new Set(contributions.map(({ path }) => path)).size, contributions.length, 'Theme paths must be unique.');

for (const contribution of contributions) {
  const theme = await readJson(contribution.path);
  const context = contribution.label;
  assert.equal(theme.name, context, `${context}: name must match the manifest.`);
  assert.equal(contribution.uiTheme, 'vs-dark', `${context}: expected a dark UI.`);
  assert.equal(theme.type, 'dark', `${context}: expected a dark theme.`);
  assert.ok(theme.colors?.['editor.background'], `${context}: missing editor background.`);
  assert.ok(theme.colors?.['editor.foreground'], `${context}: missing editor foreground.`);

  for (const [key, value] of Object.entries(theme.colors)) {
    assert.match(value, color, `${context}: invalid workbench color ${key}.`);
  }
  assert.ok(Array.isArray(theme.tokenColors) && theme.tokenColors.length, `${context}: missing TextMate rules.`);
  for (const rule of theme.tokenColors) {
    assert.ok(typeof rule.scope === 'string' || (Array.isArray(rule.scope) && rule.scope.length), `${context}: missing token scope.`);
    assert.match(rule.settings?.foreground, opaqueColor, `${context}: invalid token color for ${rule.name}.`);
  }
  assert.equal(theme.semanticHighlighting, true, `${context}: semantic highlighting must be enabled.`);
  assert.ok(theme.semanticTokenColors && Object.keys(theme.semanticTokenColors).length, `${context}: missing semantic tokens.`);
  for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
    const foreground = typeof value === 'string' ? value : value.foreground;
    assert.match(foreground, opaqueColor, `${context}: invalid semantic color ${key}.`);
  }
  console.log(`OK ${context}`);
}

console.log(`Validated ${contributions.length} themes.`);
