import { MediaImage } from "@/components/media/MediaImage";

export function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-display text-[1.65rem] text-saffron sm:text-3xl lg:text-4xl">{children}</h2>
      <div className="mt-3 flex items-center justify-center gap-3" aria-hidden>
        <span className="h-px w-12 bg-saffron/55 sm:w-16" />
        <MediaImage
          src="/images/lotus-logo-mark.png"
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        <span className="h-px w-12 bg-saffron/55 sm:w-16" />
      </div>
    </div>
  );
}
