"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

function webpFor(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) return null;
  if (src.endsWith(".png") || src.endsWith(".jpg") || src.endsWith(".jpeg")) {
    return src.replace(/\.(png|jpe?g)$/i, ".webp");
  }
  return null;
}

export function MediaImage({
  src,
  alt,
  className = "",
  sizes,
  width,
  height,
  fill,
  priority = false,
}: Props) {
  const webp = webpFor(src);
  const imgClass = fill
    ? `absolute inset-0 h-full w-full ${className}`
    : className;
  const img = (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      className={imgClass}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
      draggable={false}
    />
  );
  if (!webp) return img;
  return (
    <picture className={fill ? "absolute inset-0 block h-full w-full" : "contents"}>
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      {img}
    </picture>
  );
}
