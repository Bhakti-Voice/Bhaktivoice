import { Bell, BookOpen, Sparkles, Users } from "lucide-react";

const ICONS = [BookOpen, Sparkles, Users, Bell];

export function BlogPromiseBar({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <section aria-label="Spiritual Commitments" className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#fffdf9] via-[#fff7ee] to-[#faeee0] p-6 sm:p-8 ring-1 ring-[#e8dfd2] shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? BookOpen;
          return (
            <div
              key={item.title}
              className="flex gap-4 sm:flex-col sm:items-center sm:text-center p-3 rounded-2xl transition-colors hover:bg-white/60"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-saffron-deep shadow-sm ring-1 ring-saffron/20">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-ink">{item.title}</h2>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted/90">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

