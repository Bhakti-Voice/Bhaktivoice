export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded-full bg-sand" />
      <div className="mt-6 h-12 w-3/4 max-w-xl animate-pulse rounded-2xl bg-sand" />
      <div className="mt-8 aspect-[16/9] animate-pulse rounded-[32px] bg-sand" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 animate-pulse rounded-3xl bg-sand" />
        <div className="h-40 animate-pulse rounded-3xl bg-sand" />
        <div className="h-40 animate-pulse rounded-3xl bg-sand" />
      </div>
    </div>
  );
}
