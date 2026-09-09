import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services, specialties } from "../../src/content/catalog";

const routes = [
  "/",
  "/solucoes",
  "/sobre-nos",
  "/especialidades",
  "/simulador",
  "/contato",
  "/privacidade",
  "/acessibilidade",
  ...services.map((item) => `/solucoes/${item.slug}`),
  ...specialties.map((item) => `/especialidades/${item.slug}`),
];

test("all routes support direct requests and server-rendered headings", async ({
  request,
}) => {
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    expect(await response.text(), route).toContain("<h1");
  }
  expect((await request.get("/solucoes/not-a-service")).status()).toBe(404);
  expect((await request.get("/unknown-page")).status()).toBe(404);
});

test("Solutions navigation and reload preserve working cards", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByText("Menu +", { exact: true }).click();
  await page
    .getByRole("navigation", {
      name: isMobile ? "Navegação móvel" : "Navegação principal",
      exact: true,
    })
    .getByRole("link", { name: "Soluções", exact: true })
    .click();
  await expect(page).toHaveURL(/\/solucoes$/);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "cinco frentes",
  );
  const links = page.getByRole("link", {
    name: "WhatsApp da empresa original",
  });
  await expect(links).toHaveCount(5);
  for (const link of await links.all())
    expect(await link.getAttribute("href")).toMatch(
      /^https:\/\/wa\.me\/5511994453204\?/,
    );
});

test("local scenario validates, recommends and resets without a submission", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") submissions.push(request.url());
  });
  await page.goto("/simulador");
  await page.getByRole("button", { name: "Ver próximo passo" }).click();
  await expect(
    page.getByRole("heading", { name: "Conheça o BPO Financeiro" }),
  ).toHaveCount(0);
  await page.getByLabel("Organizar o financeiro").check();
  await page.getByRole("button", { name: "Ver próximo passo" }).click();
  await expect(
    page.getByRole("heading", { name: "Conheça o BPO Financeiro" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Recomeçar" }).click();
  await expect(page.getByLabel("Organizar o financeiro")).not.toBeChecked();
  expect(submissions).toEqual([]);
});

test("headquarters photo control and reduced motion remain accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "As pessoas" }).click();
  await expect(
    page.getByRole("button", { name: "As pessoas" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", { name: /Equipe da Player reunida/ }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .getByRole("img", { name: /Equipe da Player reunida/ })
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("headquarters story follows a short scroll sequence", async ({ page }) => {
  await page.goto("/");
  await page.locator(".office-section").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "As pessoas" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("scroll transforms the hero and pause restores a static composition", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".cinematic-home")).toHaveAttribute(
    "data-motion",
    "ready",
  );
  const sculpture = page.locator(".portal-sculpture");
  const before = await sculpture.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const fragment = page.locator(".brand-fragment").first();
  await expect(page.locator(".brand-fragment")).toHaveCount(3);
  const fragmentBefore = await fragment.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
  await expect
    .poll(() =>
      sculpture.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(before);
  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  await expect
    .poll(() => fragment.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(fragmentBefore);
  await page.getByRole("button", { name: "Pausar movimento" }).click();
  await expect(
    page.getByRole("button", { name: "Ativar movimento" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(sculpture).toHaveCSS("transform", "none");
  await expect(fragment).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Ativar movimento" }).click();
  await expect(page.locator(".cinematic-home")).toHaveAttribute(
    "data-motion",
    "ready",
  );
});

test("home fits required widths and reduced motion removes the scroll scene", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.locator(".portal-sculpture")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "relative");
  await page.locator(".service-row").first().click();
  await expect(page).toHaveURL(/solucoes\/bpo-financeiro$/);
});

test("key pages meet automated accessibility checks and fit the viewport", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  for (const route of [
    "/",
    "/solucoes",
    "/simulador",
    "/sobre-nos",
    "/contato",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations, route).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
  expect(runtimeErrors).toEqual([]);
});

test("inner-page scroll scenes survive navigation and can be paused", async ({
  page,
}) => {
  await page.goto("/solucoes");
  await expect(page.locator(".route-motion")).toHaveAttribute(
    "data-motion",
    "ready",
  );
  const art = page.locator(".intro-orbit");
  const initial = await art.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo({ top: 350, behavior: "instant" }));
  await expect
    .poll(() => art.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  await page.getByRole("button", { name: "Pausar movimento" }).click();
  await expect(art).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Ativar movimento" }).click();
  await page
    .getByRole("link", { name: "Explorar solução", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/solucoes\/bpo-financeiro$/);
  await expect(page.locator(".route-motion")).toHaveAttribute(
    "data-motion",
    "ready",
  );
  await expect(page.locator(".motion-toggle")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".intro-orbit")).toHaveCSS("transform", "none");
  await expect(page.locator(".motion-toggle")).toBeHidden();
});

test("official identity and the complete institutional chapters are available", async ({
  page,
}) => {
  await page.goto("/sobre-nos");
  const logo = page.locator("header .player-logo");
  await expect(logo).toHaveAttribute(
    "src",
    "/images/official/logo-principal.png",
  );
  await expect
    .poll(() => logo.evaluate((el) => (el as HTMLImageElement).naturalWidth))
    .toBe(225);
  await expect(page.locator(".principles-grid article")).toHaveCount(3);
  await expect(page.locator(".structure-gallery figure")).toHaveCount(6);
  await expect(page.locator(".credentials-grid article")).toHaveCount(9);
  await expect(page.locator(".testimonial-card")).toHaveCount(3);
  await page
    .locator(".structure-gallery figure")
    .first()
    .scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".structure-gallery img")
        .first()
        .evaluate((el) => (el as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.goto("/solucoes");
  await expect(
    page.getByRole("link", { name: "Google Play", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.grupoconnectcontabilidade",
  );
  await expect(page.locator(".operation-scene")).toHaveCount(3);
  await expect(page.locator(".app-phone")).toBeAttached();
});

test("expanded pages fit all required widths with motion enabled", async ({
  page,
}) => {
  for (const route of [
    "/solucoes",
    "/sobre-nos",
    "/especialidades",
    "/contato",
  ]) {
    await page.goto(route);
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect
        .poll(
          () =>
            page.evaluate(
              (expectedWidth) =>
                document.documentElement.scrollWidth <= expectedWidth &&
                innerWidth === expectedWidth,
              width,
            ),
          `${route} ${width}`,
        )
        .toBe(true);
    }
  }
});

test("content and native navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Seu negócio.",
  );
  await expect(page.locator(".hero-stage")).toHaveCSS("position", "relative");
  await expect(page.locator(".motion-toggle")).toBeHidden();
  await expect(page.locator(".service-row")).toHaveCount(5);
  await page.locator(".service-row").first().click();
  await expect(page).toHaveURL(/solucoes\/bpo-financeiro$/);
  await context.close();
});

test("sharing assets, noindex and security headers are present", async ({
  request,
  page,
}) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(response.headers()["x-robots-tag"]).toContain("noindex");
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  const favicon = await request.get("/icon.svg");
  expect(favicon.status()).toBe(200);
  expect(await favicon.text()).toContain("data:image/png;base64,");
  await page.goto("/");
  await expect(page.locator(".office-photo")).toHaveCSS("position", "relative");
  await expect(
    page.locator('.office-photo img[data-visible="false"]'),
  ).toHaveCSS("opacity", "0");
  await expect(
    page.locator('meta[property="og:image"]').first(),
  ).toHaveAttribute("content", /opengraph-image/);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
});
