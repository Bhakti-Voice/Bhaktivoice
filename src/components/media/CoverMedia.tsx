import { MediaImage } from "@/components/media/MediaImage";
import { BrandFallback } from "@/components/media/BrandFallback";

export const ARTICLE_COVER_CLASS = "mt-6 flex justify-center px-1 sm:px-2";

export function CoverMedia({
  src,
  alt,
  className = "aspect-[2/1] w-full rounded-2xl",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 900px",
  fit = "cover",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
}) {
  const image = src?.trim();

  if (fit === "contain") {
    return (
      <div className={className}>
        {image ? (
          <MediaImage
            src={image}
            alt={alt}
            priority={priority}
            sizes={sizes}
            className="h-auto max-h-64 w-auto max-w-full rounded-2xl object-contain sm:max-h-80 lg:max-w-lg"
          />
        ) : (
          <div className="relative aspect-[2/1] w-full max-w-lg overflow-hidden rounded-2xl bg-sand">
            <BrandFallback />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {image ? (
        <MediaImage src={image} alt={alt} fill priority={priority} className="object-cover" sizes={sizes} />
      ) : (
        <BrandFallback />
      )}
    </div>
  );
}
