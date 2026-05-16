import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const OUT_DIR = path.resolve(process.cwd(), "screenshots");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const SHOTS: Array<{ name: string; url: string; full?: boolean; wait?: number; auth?: boolean }> = [
  { name: "01-landing-hero", url: "http://localhost:3000", wait: 2500 },
  { name: "02-landing-full", url: "http://localhost:3000", full: true, wait: 3000 },
  { name: "03-login", url: "http://localhost:3000/login", wait: 1500 },
  { name: "04-register", url: "http://localhost:3000/register", wait: 1500 },
  { name: "05-invest-plans", url: "http://localhost:3000/invest", wait: 2000, auth: true },
  { name: "06-dashboard", url: "http://localhost:3000/dashboard", wait: 2500, auth: true },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let cookies: any[] = [];

  // Login first to grab session cookies for authed pages
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/login", { waitUntil: "networkidle0" });
    await page.type('input[type="email"]', "demo@nexvest.com");
    await page.type('input[type="password"]', "demo1234");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);
    cookies = await page.cookies();
    await page.close();
  }

  for (const shot of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    if (shot.auth && cookies.length) await page.setCookie(...cookies);

    try {
      await page.goto(shot.url, { waitUntil: "networkidle0", timeout: 20000 });
    } catch (e) {
      console.log(`Timeout for ${shot.name}, continuing`);
    }
    await new Promise((r) => setTimeout(r, shot.wait || 1500));

    const file = path.join(OUT_DIR, `${shot.name}.png`);
    await page.screenshot({ path: file as `${string}.png`, fullPage: !!shot.full });
    console.log(`Saved ${file}`);
    await page.close();
  }

  await browser.close();
})();
