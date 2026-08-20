import { FaqList } from "@/components/seo/FaqList";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { getHubSeo } from "@/lib/content";
import type { HubSeoId } from "@/lib/content/hub-seo";
import { ProseText } from "@/components/content/SectionBody";

export async function HubSeoBlock({
  id,
  collapsible = false,
  faqJsonLd = true,
  hideFaqs = false,
}: {
  id: HubSeoId;
  collapsible?: boolean;
  faqJsonLd?: boolean;
  hideFaqs?: boolean;
}) {
  const hub = await getHubSeo(id);
  if (!hub?.heading) return null;

  return (
    <section className="mt-10">
      <ExpandableSection title={hub.heading} className="mt-0" collapsible={collapsible}>
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
          {hub.paragraphs.map((paragraph) => (
            <ProseText key={paragraph.slice(0, 48)} text={paragraph} />
          ))}
        </div>
        {hub.points?.length ? (
          <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted">
            {hub.points.map((point) => (
              <ProseText as="li" key={point} text={point} />
            ))}
          </ul>
        ) : null}
      </ExpandableSection>
      {hideFaqs ? null : <FaqList faqs={hub.faqs ?? []} jsonLd={faqJsonLd} />}
    </section>
  );
}
