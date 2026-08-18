import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/content/types";
import { faqSchema } from "@/lib/seo/schema";
import { JsonLd } from "./JsonLd";
import { ProseText } from "@/components/content/SectionBody";

export function FaqList({
  faqs,
  className,
  title = "Frequently asked questions",
  jsonLd = true,
}: {
  faqs: Faq[];
  className?: string;
  title?: string;
  jsonLd?: boolean;
}) {
  if (!faqs.length) return null;
  return (
    <section className={className ?? "mt-10"} aria-labelledby="faq-heading">
      {jsonLd ? <JsonLd data={faqSchema(faqs)} /> : null}
      <h2 id="faq-heading" className="font-serif text-lg text-ink">
        {title}
      </h2>
      <div className="mt-3 space-y-2">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl bg-white px-5 py-3.5 ring-1 ring-line"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-saffron transition group-open:rotate-180" />
            </summary>
            <ProseText text={faq.answer} className="mt-3 text-sm leading-relaxed text-muted" />
          </details>
        ))}
      </div>
    </section>
  );
}
