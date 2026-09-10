import { test, expect } from "@playwright/test";
import { services, specialties } from "../../src/content/catalog";

test("CSP permits real scripts in report-only and enforced modes, including 404", async ({
  page,
  isMobile,
}) => {
  test.setTimeout(90000);
  const routes = [
    "/",
    "/solucoes",
    "/sobre-nos",
    "/especialidades",
    "/simulador",
    "/contato",
    "/privacidade",
    "/acessibilidade",
    ...services.map((s) => `/solucoes/${s.slug}`),
    ...specialties.map((s) => `/especialidades/${s.slug}`),
    "/unknown-security-check",
  ];
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      document.documentElement.dataset.cspViolation = event.effectiveDirective;
    });
  });
  for (const reportOnly of [true, false]) {
    if (reportOnly)
      await page.route("**/*", async (route) => {
        if (!route.request().isNavigationRequest()) return route.continue();
        const response = await route.fetch();
        const headers = { ...response.headers() };
        headers["content-security-policy-report-only"] =
          headers["content-security-policy"];
        delete headers["content-security-policy"];
        await route.fulfill({ response, headers });
      });
    else await page.unrouteAll();
    for (const path of routes) {
      const response = await page.goto(path);
      const header =
        response!.headers()[
          reportOnly
            ? "content-security-policy-report-only"
            : "content-security-policy"
        ];
      const scripts = header
        .split(";")
        .find((part) => part.trim().startsWith("script-src "))!;
      expect(scripts).toContain("'sha256-");
      expect(scripts).not.toContain("unsafe-inline");
      expect(scripts).not.toContain("unsafe-eval");
      if (path === "/" && isMobile) {
        const peopleControl = page.getByRole("button", {
          name: "As pessoas",
        });
        await peopleControl.click();
        await expect(peopleControl).toHaveAttribute("aria-pressed", "true");
      } else if (isMobile) {
        await expect(page.locator(".route-motion")).not.toHaveAttribute(
          "data-motion",
          "ready",
        );
        await expect(page.locator(".motion-toggle")).toBeHidden();
      } else {
        await expect(
          page.locator(path === "/" ? ".cinematic-home" : ".route-motion"),
        ).toHaveAttribute("data-motion", "ready");
      }
      await expect(
        page.locator("html"),
        `${path}, report-only=${reportOnly}`,
      ).not.toHaveAttribute("data-csp-violation");
    }
  }
});

test("CSP blocks unauthorized inline scripts and event handlers", async ({
  page,
}) => {
  await page.goto("/");
  const blocked = await page.evaluate(async () => {
    const violations: string[] = [];
    const observed = new Promise<string[]>((resolve) => {
      document.addEventListener("securitypolicyviolation", (event) => {
        violations.push(event.effectiveDirective);
        if (violations.length === 2) resolve(violations);
      });
    });
    const script = document.createElement("script");
    script.textContent =
      "document.documentElement.dataset.injectedScript = 'ran'";
    document.body.append(script);
    const button = document.createElement("button");
    button.setAttribute(
      "onclick",
      "document.documentElement.dataset.injectedHandler = 'ran'",
    );
    document.body.append(button);
    button.click();
    return observed;
  });
  expect(blocked).toEqual(
    expect.arrayContaining(["script-src-elem", "script-src-attr"]),
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-injected-script",
  );
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-injected-handler",
  );
});
