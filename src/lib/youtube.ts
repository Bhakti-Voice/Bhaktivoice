export function youtubeVideoId(raw?: string | null) {
  const text = (raw || "").trim();
  if (!text) return "";
  const path = text.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:embed|shorts|live)\/|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  if (path?.[1]) return path[1];
  const query = text.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (query?.[1]) return query[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(text)) return text;
  return "";
}
