import { getContent, listContent, searchContent } from "@/lib/cms/client";
import type {
  BlogPost,
  CommunityGroup,
  FestivalPage,
  HubSeo,
  KathaSeries,
  MantraPage,
  Product,
  SankalpOffer,
  SpiritualityPage,
  StoreCategory,
  TemplePage,
  YatraPage,
} from "./types";

export async function listMantras() {
  return listContent<MantraPage>("mantra");
}
export async function getMantra(slug: string) {
  return getContent<MantraPage>("mantra", slug);
}

export async function listYatra() {
  return listContent<YatraPage>("yatra");
}
export async function getYatra(slug: string) {
  return getContent<YatraPage>("yatra", slug);
}

export async function listTemples() {
  return listContent<TemplePage>("temple");
}
export async function getTemple(slug: string) {
  return getContent<TemplePage>("temple", slug);
}

export async function listFestivals() {
  return listContent<FestivalPage>("festival");
}
export async function getFestival(slug: string) {
  return getContent<FestivalPage>("festival", slug);
}

export async function listSpirituality() {
  return listContent<SpiritualityPage>("spirituality");
}
export async function getSpirituality(slug: string) {
  return getContent<SpiritualityPage>("spirituality", slug);
}

export async function listBlog() {
  return listContent<BlogPost>("blog");
}
export async function getBlog(slug: string) {
  return getContent<BlogPost>("blog", slug);
}

export async function listKatha() {
  return listContent<KathaSeries>("katha");
}
export async function getKatha(slug: string) {
  return getContent<KathaSeries>("katha", slug);
}

export async function listProducts() {
  const items = await listContent<Product>("product");
  return items.map((item) => ({ ...item, outOfStock: Boolean(item.outOfStock) }));
}
export async function getProduct(slug: string) {
  const item = await getContent<Product>("product", slug);
  return item ? { ...item, outOfStock: Boolean(item.outOfStock) } : item;
}

export async function listStoreCategories() {
  return listContent<StoreCategory>("store_category");
}
export async function getStoreCategory(slug: string) {
  return getContent<StoreCategory>("store_category", slug);
}

export async function listCommunityGroups() {
  return listContent<CommunityGroup>("community_group");
}
export async function getCommunityGroup(slug: string) {
  return getContent<CommunityGroup>("community_group", slug);
}

export async function listSankalpOffers() {
  return listContent<SankalpOffer>("sankalp_offer");
}

export async function listBhajan() {
  return listContent<SpiritualityPage>("bhajan");
}
export async function getBhajan(slug: string) {
  return getContent<SpiritualityPage>("bhajan", slug);
}

export async function listAarti() {
  return listContent<SpiritualityPage>("aarti");
}
export async function getAarti(slug: string) {
  return getContent<SpiritualityPage>("aarti", slug);
}

export async function listChalisa() {
  return listContent<SpiritualityPage>("chalisa");
}
export async function getChalisa(slug: string) {
  return getContent<SpiritualityPage>("chalisa", slug);
}

export async function getHubSeo(id: string) {
  return getContent<HubSeo>("hub_seo", id);
}

export async function searchIndex(query: string) {
  return searchContent(query);
}
