import assert from 'node:assert/strict';
import { globSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { _electron as electron } from 'playwright';

const executables = {
  darwin: 'dist/mac*/Electron React Starter.app/Contents/MacOS/Electron React Starter',
  win32: 'dist/win*-unpacked/Electron React Starter.exe',
  linux: 'dist/linux*-unpacked/electron-react-starter',
};
const pattern = executables[process.platform];
const paths = process.argv[2] ? [process.argv[2]] : pattern ? globSync(pattern) : [];
assert.equal(paths.length, 1, 'Run npm run pack first or pass the path to the packaged executable.');

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const cwd = await mkdtemp(join(tmpdir(), 'electron-starter-smoke-'));
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

try {
  const app = await electron.launch({ executablePath: resolve(paths[0]), cwd, env, timeout: 30_000 });

  try {
    const window = await app.firstWindow();
    await window.getByRole('heading', { name: 'Electron React Starter', exact: true }).waitFor({
      timeout: 10_000,
    });
    assert.equal(window.url(), 'app://renderer/index.html');

    const mark = window.locator('.brand-mark');
    assert.ok(await mark.evaluate(async (image) => {
      await image.decode();
      return image.naturalWidth > 0;
    }));
    const layout = await window.locator('.version').evaluate((section) => {
      return globalThis.getComputedStyle(section).display;
    });
    assert.equal(layout, 'flex', 'The renderer stylesheet should load.');

    await window.getByRole('button', { name: 'Read version' }).click({ timeout: 10_000 });
    const status = window.getByRole('status');
    await status.filter({ hasText: `App version: ${version}` }).waitFor({
      timeout: 10_000,
    });
    assert.equal(await status.textContent(), `App version: ${version}`);
    console.log(`Packaged renderer, asset and IPC verified on ${process.platform}.`);
  } finally {
    await app.close();
  }
} finally {
  await rm(cwd, { recursive: true, force: true });
}
