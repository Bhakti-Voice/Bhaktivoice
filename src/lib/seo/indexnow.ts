import { SITE } from "./site";

export const INDEXNOW_KEY = "3b4f6e7c8d9a4b1c2d3e";
export const INDEXNOW_KEY_LOCATION = `${SITE.url}/${INDEXNOW_KEY}.txt`;

export type IndexNowResult = {
  ok: boolean;
  status: number;
  message: string;
};

/**
 * Submit URLs directly to IndexNow (Bing, Copilot, Yandex, Seznam).
 * This alerts search engines to crawl and index modified/new pages within minutes.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (!urls.length) {
    return { ok: true, status: 200, message: "No URLs provided" };
  }

  const host = new URL(SITE.url).hostname;
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls.slice(0, 10000), // IndexNow allows up to 10,000 URLs per request
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return {
        ok: true,
        status: response.status,
        message: `Successfully submitted ${urls.length} URLs to IndexNow.`,
      };
    }

    const text = await response.text();
    return {
      ok: false,
      status: response.status,
      message: `IndexNow returned status ${response.status}: ${text}`,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error submitting to IndexNow",
    };
  }
}
