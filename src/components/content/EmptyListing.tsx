import { getMessages } from "@/lib/i18n/server";
import type { Messages } from "@/lib/i18n/messages";

type EmptyKind = keyof Messages["emptyLabels"];

export async function EmptyListing({
  kind,
  label,
}: {
  kind?: EmptyKind;
  label?: string;
}) {
  const t = await getMessages();
  const name = (kind ? t.emptyLabels[kind] : label) ?? "";
  return (
    <p className="mt-10 rounded-[28px] bg-white px-6 py-12 text-center text-muted ring-1 ring-line">
      {t.empty(name)}
    </p>
  );
}
