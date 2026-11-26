import { useState } from 'react';
import icon from '../../resources/icon.png';

export function App() {
  const desktop = window.desktop;
  const [status, setStatus] = useState('');
  const [isReading, setIsReading] = useState(false);

  async function readVersion() {
    if (!desktop) return;

    setIsReading(true);
    setStatus('');
    try {
      const version = await desktop.getAppVersion();
      setStatus(`App version: ${version}`);
    } catch {
      setStatus('Could not read the app version. Try again.');
    } finally {
      setIsReading(false);
    }
  }

  return (
    <main className="starter">
      <header>
        <img className="brand-mark" src={icon} alt="" width="78" height="78" />
        <h1>
          Electron React <br />
          Starter
        </h1>
        <p>A desktop starting point built with Electron, React, TypeScript and Vite.</p>
      </header>

      <section className="version" aria-labelledby="version-heading">
        <div>
          <h2 id="version-heading">App version</h2>
          <p>Read the version from Electron’s main process.</p>
        </div>
        <button type="button" disabled={!desktop || isReading} onClick={readVersion}>
          {isReading ? 'Reading…' : 'Read version'}
        </button>
      </section>

      <p className="status" role="status">
        {desktop ? status : 'Open the desktop app to use this example.'}
      </p>
    </main>
  );
}
