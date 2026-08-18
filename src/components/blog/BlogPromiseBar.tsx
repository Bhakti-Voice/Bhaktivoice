import { Bell, BookOpen, Sparkles, Users } from "lucide-react";

const ICONS = [BookOpen, Sparkles, Users, Bell];

export function BlogPromiseBar({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <section className="mt-8 rounded-[28px] bg-[#f8efe4] px-5 py-6 sm:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? BookOpen;
          return (
            <div key={item.title} className="flex gap-3 sm:flex-col sm:items-center sm:text-center lg:flex-col">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-saffron ring-1 ring-[#f3d2b3]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-lg text-ink">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
