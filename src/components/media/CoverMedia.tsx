import { MediaImage } from "@/components/media/MediaImage";
import { BrandFallback } from "@/components/media/BrandFallback";

export function CoverMedia({
  src,
  alt,
  className = "aspect-[2/1] w-full rounded-2xl",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 900px",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = src?.trim();
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
