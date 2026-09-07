import Link from "next/link";
import { services } from "@/content/catalog";
import { companyWhatsAppUrl } from "@/lib/reference-links";

export function ServiceGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="service-grid">
      {services.map((service, index) => (
        <article className="service-card" key={service.slug}>
          <div className="card-top">
            <span className="section-number">0{index + 1}</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h3>
            <Link href={`/solucoes/${service.slug}`}>{service.title}</Link>
          </h3>
          <p>{service.description}</p>
          {detailed && (
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <div className="card-actions">
            <Link className="text-link" href={`/solucoes/${service.slug}`}>
              Explorar solução <span aria-hidden="true">↗</span>
            </Link>
            {detailed && (
              <a
                className="reference-link"
                href={companyWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp da empresa original ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
