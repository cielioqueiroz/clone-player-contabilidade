import test from "node:test";
import assert from "node:assert/strict";
import { getRecommendation, priorities } from "../../src/lib/diagnosis.ts";
import { companyWhatsAppUrl } from "../../src/lib/reference-links.ts";
import { services } from "../../src/content/catalog.ts";

test("every supported priority links to an implemented service", () => {
  const available = new Set(
    services.map((service) => `/solucoes/${service.slug}`),
  );
  for (const priority of priorities) {
    const result = getRecommendation(priority);
    assert.ok(result);
    assert.ok(available.has(result.href));
  }
});
test("unknown and malformed values cannot produce a recommendation", () => {
  for (const value of [undefined, null, "", "admin", "<script>", {}, 123])
    assert.equal(getRecommendation(value), null);
});
test("contact URL uses a fixed destination and transparent demo context", () => {
  const url = new URL(companyWhatsAppUrl());
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5511994453204");
  assert.match(url.searchParams.get("text") ?? "", /demonstrativo/);
});
