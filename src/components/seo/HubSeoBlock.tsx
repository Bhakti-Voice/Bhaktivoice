import { FaqList } from "@/components/seo/FaqList";
import { ExpandableSection } from "@/components/seo/ExpandableSection";
import { getHubSeo } from "@/lib/content";
import type { HubSeoId } from "@/lib/content/hub-seo";

export async function HubSeoBlock({ id }: { id: HubSeoId }) {
  const hub = await getHubSeo(id);
  if (!hub?.heading) return null;

  return (
    <section className="mt-10">
      <ExpandableSection title={hub.heading} className="mt-0">
        <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted">
          {hub.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        {hub.points?.length ? (
          <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted">
            {hub.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </ExpandableSection>
      <FaqList faqs={hub.faqs ?? []} />
    </section>
  );
}
