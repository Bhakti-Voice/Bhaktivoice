import { headers } from "next/headers";
import { hreflangForPath } from "@/lib/seo/hreflang";

/** Reciprocal hreflang so Google can pair the English page with the same page in Hindi. */
export async function HreflangLinks() {
  const pathname = (await headers()).get("x-pathname") || "/";
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/")) return null;
  const links = hreflangForPath(pathname);

  return (
    <>
      <link rel="alternate" hrefLang="en-IN" href={links["en-IN"]} />
      <link rel="alternate" hrefLang="hi-IN" href={links["hi-IN"]} />
      <link rel="alternate" hrefLang="x-default" href={links["x-default"]} />
    </>
  );
}
