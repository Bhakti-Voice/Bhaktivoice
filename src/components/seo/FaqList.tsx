import { ChevronDown, HelpCircle } from "lucide-react";
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
    <section className={className ?? "mt-12"} aria-labelledby="faq-heading">
      {jsonLd ? <JsonLd data={faqSchema(faqs)} /> : null}
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="h-5 w-5 text-saffron" />
        <h2 id="faq-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink">
          {title}
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl bg-white p-5 ring-1 ring-[#e8dfd2] shadow-2xs transition-all duration-200 open:bg-[#fffdf9] open:ring-saffron/30"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span className="text-sm sm:text-base leading-snug group-hover:text-saffron-deep transition-colors">
                {faq.question}
              </span>
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand/60 text-saffron transition group-open:rotate-180 group-open:bg-saffron/10">
                <ChevronDown className="h-4 w-4" />
              </span>
            </summary>
            <div className="mt-3.5 pt-3.5 border-t border-line/60">
              <ProseText text={faq.answer} className="text-sm leading-relaxed text-muted/95" />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

