import { youtubeVideoId } from "@/lib/youtube";

export function YouTubeEmbed({
  url,
  title = "YouTube video",
  compact = false,
}: {
  url?: string;
  title?: string;
  compact?: boolean;
}) {
  const id = youtubeVideoId(url);
  if (!id) return null;
  return (
    <div
      className={
        compact
          ? "overflow-hidden rounded-2xl bg-sand ring-1 ring-line"
          : "mt-10 overflow-hidden rounded-2xl bg-sand"
      }
    >
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
