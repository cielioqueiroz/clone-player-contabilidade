export function companyWhatsAppUrl(): string {
  const url = new URL("https://wa.me/5511994453204");
  url.searchParams.set(
    "text",
    "Olá, consultei um projeto demonstrativo sobre a Player e gostaria de informações pelo canal oficial.",
  );
  return url.toString();
}
