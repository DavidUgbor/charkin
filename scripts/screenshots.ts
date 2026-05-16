import puppeteer, { type Page } from "puppeteer";
import path from "path";
import fs from "fs";

const OUT_DIR = path.resolve(process.cwd(), "screenshots");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  async function newPage(): Promise<Page> {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    return page;
  }

  async function snap(page: Page, file: string, full = false) {
    const out = path.join(OUT_DIR, file);
    await page.screenshot({ path: out as `${string}.png`, fullPage: full });
    console.log(`Saved ${out}`);
  }

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // Login first
  let cookies: any[] = [];
  {
    const page = await newPage();
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

  // 1. Landing - hero
  {
    const p = await newPage();
    await p.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await wait(3000);
    await snap(p, "tour-01-hero.png");
    await p.close();
  }

  // 2. Landing - about
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/#about", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => document.getElementById("about")?.scrollIntoView());
    await wait(1000);
    await snap(p, "tour-02-about.png");
    await p.close();
  }

  // 3. Landing - plans (all 5 tiers)
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/#plans", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => document.getElementById("plans")?.scrollIntoView());
    await wait(1000);
    await snap(p, "tour-03-plans.png");
    await p.close();
  }

  // 4. Landing - how it works
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/#how-it-works", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => document.getElementById("how-it-works")?.scrollIntoView());
    await wait(1000);
    await snap(p, "tour-04-how-it-works.png");
    await p.close();
  }

  // 5. Landing - testimonials with video cards
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/#testimonials", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => document.getElementById("testimonials")?.scrollIntoView());
    await wait(1000);
    await snap(p, "tour-05-testimonials.png");
    await p.close();
  }

  // 6. Video modal open
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/#testimonials", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => document.getElementById("testimonials")?.scrollIntoView());
    await wait(800);
    // Click the first video testimonial card
    await p.evaluate(() => {
      const cards = document.querySelectorAll('#testimonials [class*="cursor-pointer"]');
      (cards[0] as HTMLElement)?.click();
    });
    await wait(1500);
    await snap(p, "tour-06-video-modal.png");
    await p.close();
  }

  // 7. Register
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/register", { waitUntil: "networkidle0" });
    await wait(1000);
    await p.type('input[placeholder="John Smith"]', "Sarah Williams");
    await p.type('input[type="email"]', "sarah@example.com");
    await p.type('input[placeholder="Min. 8 characters"]', "MyStr0ng!Pass");
    await wait(500);
    await snap(p, "tour-07-register.png");
    await p.close();
  }

  // 8. Login
  {
    const p = await newPage();
    await p.goto("http://localhost:3000/login", { waitUntil: "networkidle0" });
    await wait(1000);
    await snap(p, "tour-08-login.png");
    await p.close();
  }

  // 9. Dashboard
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/dashboard", { waitUntil: "networkidle0" });
    await wait(2500);
    await snap(p, "tour-09-dashboard.png");
    await p.close();
  }

  // 10. Invest - step 1 plan picker
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/invest", { waitUntil: "networkidle0" });
    await wait(2000);
    await snap(p, "tour-10-invest-plans.png");
    await p.close();
  }

  // 11. Invest - step 2 amount (Gold plan preselected via ?plan=)
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/invest?plan=gold", { waitUntil: "networkidle0" });
    await wait(2000);
    await snap(p, "tour-11-invest-amount.png");
    await p.close();
  }

  // 12. Invest - step 3 payment (card)
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/invest?plan=gold", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const cont = buttons.find((b) => b.textContent?.includes("Continue to Payment"));
      (cont as HTMLElement)?.click();
    });
    await wait(1200);
    await snap(p, "tour-12-invest-payment.png");
    await p.close();
  }

  // 13. Invest - bank transfer view
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/invest?plan=gold", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const cont = buttons.find((b) => b.textContent?.includes("Continue to Payment"));
      (cont as HTMLElement)?.click();
    });
    await wait(1200);
    await p.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const bank = buttons.find((b) => b.textContent?.includes("Bank Transfer"));
      (bank as HTMLElement)?.click();
    });
    await wait(800);
    await snap(p, "tour-13-invest-bank.png");
    await p.close();
  }

  // 14. Invest - confirmation review
  {
    const p = await newPage();
    await p.setCookie(...cookies);
    await p.goto("http://localhost:3000/invest?plan=gold", { waitUntil: "networkidle0" });
    await wait(2000);
    await p.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const cont = buttons.find((b) => b.textContent?.includes("Continue to Payment"));
      (cont as HTMLElement)?.click();
    });
    await wait(1200);
    await p.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const rev = buttons.find((b) => b.textContent?.includes("Review Investment"));
      (rev as HTMLElement)?.click();
    });
    await wait(1000);
    await snap(p, "tour-14-invest-confirm.png");
    await p.close();
  }

  // 15. Mobile landing
  {
    const p = await browser.newPage();
    await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await p.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await wait(2500);
    await snap(p, "tour-15-mobile-landing.png");
    await p.close();
  }

  await browser.close();
})();
