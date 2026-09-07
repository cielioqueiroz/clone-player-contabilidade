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
  await page.getByRole("button", { name: "02 / As pessoas" }).click();
  await expect(
    page.getByRole("button", { name: "02 / As pessoas" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", { name: /Equipe da Player reunida/ }),
  ).toBeVisible();
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("key pages meet automated accessibility checks and fit the viewport", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  for (const route of ["/", "/solucoes", "/simulador"]) {
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
  expect((await request.get("/icon.svg")).status()).toBe(200);
  await page.goto("/");
  await expect(
    page.locator('meta[property="og:image"]').first(),
  ).toHaveAttribute("content", /opengraph-image/);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
});
