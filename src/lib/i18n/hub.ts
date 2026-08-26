import { PATHS } from "@/lib/seo/paths";
import { buildMetadata, type BuildMetaInput } from "@/lib/seo/metadata";
import { messages } from "./messages";
import { getLocale } from "./server";

export const HUB_PATHS = {
  naamJaap: PATHS.naamJaap,
  mala: PATHS.mala,
  katha: PATHS.katha,
  yatra: PATHS.yatra,
  planner: PATHS.yatraPlanner,
  sadhana: PATHS.sadhana,
  sankalp: PATHS.sankalp,
  diary: PATHS.diary,
  blog: PATHS.blog,
  temples: PATHS.temples,
  festivals: PATHS.festivals,
  mantras: PATHS.mantras,
  spirituality: PATHS.spirituality,
  community: PATHS.community,
  store: PATHS.store,
  tithi: PATHS.tithi,
  quotes: PATHS.quotes,
  bhajan: PATHS.bhajan,
  aarti: PATHS.aarti,
  chalisa: PATHS.chalisa,
  more: PATHS.more,
} as const;

export type HubKey = keyof typeof HUB_PATHS;

export async function hubMetadata(hub: HubKey, extra?: Partial<BuildMetaInput>) {
  const locale = await getLocale();
  const copy = messages[locale].hubs[hub];
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: extra?.path ?? HUB_PATHS[hub],
    locale,
    ...extra,
  });
}
