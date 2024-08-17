import Script from 'next/script';

export default function Home() {
  return (
    <div>
      <header>Score: <span id="score">0</span></header>
      <canvas id="gameWindow" width="600" height="900"></canvas>
      <Script src="/scripts/gameScript.js" strategy="afterInteractive" />
    </div>
  );
}