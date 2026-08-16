"use client";

import { MediaImage } from "@/components/media/MediaImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, CircleDot, Heart, MapPin, Settings, ShoppingBag } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageCrumbs } from "@/lib/seo/crumbs";
import { PATHS } from "@/lib/seo/paths";
import { useAuth } from "@/lib/auth/AuthProvider";

const QUICK = [
  { href: PATHS.naamJaap, label: "Naam Jaap", icon: CircleDot },
  { href: PATHS.katha, label: "Katha", icon: BookOpen },
  { href: PATHS.diary, label: "Diary", icon: Heart },
  { href: PATHS.yatra, label: "Yatra", icon: MapPin },
  { href: PATHS.store, label: "Store", icon: ShoppingBag },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function ProfileView() {
  const { user, logout, loading } = useAuth();
  const name = user?.displayName ?? "Guest";
  const email = user?.email ?? "Sign in to keep your journey";
  const photo = user?.photoURL;
  const [stats, setStats] = useState({ naam: 0, streak: 0, sankalps: 0 });

  useEffect(() => {
    if (!user?.uid) {
      setStats({ naam: 0, streak: 0, sankalps: 0 });
      return;
    }
    void fetch(`/api/stats/user/${encodeURIComponent(user.uid)}`)
      .then((response) => response.json())
      .then((data: { naam?: number; streak?: number; sankalps?: number }) => {
        setStats({
          naam: data.naam ?? 0,
          streak: data.streak ?? 0,
          sankalps: data.sankalps ?? 0,
        });
      })
      .catch(() => setStats({ naam: 0, streak: 0, sankalps: 0 }));
  }, [user?.uid]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <Breadcrumbs items={pageCrumbs(["My Journey", "/profile"])} />
      <h1 className="mt-4 font-serif text-4xl text-ink lg:text-5xl">My Bhakti Journey</h1>

      <section className="mt-8 grid gap-6 rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-line md:grid-cols-[auto_1fr] md:p-8">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-sand">
          {photo ? (
            <MediaImage src={photo} alt="" fill className="object-cover" sizes="96px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-serif text-3xl text-saffron-deep">
              {name.slice(0, 1)}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-serif text-3xl text-ink">{name}</h2>
          <p className="mt-1 text-sm text-muted">{email}</p>
          <p className="mt-2 text-sm text-muted">
            {loading ? "Checking your session…" : user ? "Signed in" : "Demo profile"}
          </p>
          {user ? (
            <button
              type="button"
              onClick={() => void logout()}
              className="mt-4 rounded-full border border-line px-4 py-2 text-sm"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="mt-4 inline-flex rounded-full bg-navy px-5 py-2 text-sm text-white"
            >
              Sign in to save your journey
            </Link>
          )}
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Naam chanted", value: stats.naam.toLocaleString("en-IN") },
          { label: "Day streak", value: String(stats.streak) },
          { label: "Sankalps kept", value: String(stats.sankalps) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-cream p-5 ring-1 ring-line">
            <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-2 font-serif text-3xl text-ink">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-[32px] bg-navy text-white md:grid md:grid-cols-2">
        <div className="p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Current sankalp</p>
          <h2 className="mt-2 font-serif text-3xl">No sankalp yet</h2>
          <p className="mt-3 text-sm text-white/70">0 complete. Take a vow small enough to keep.</p>
          <Link
            href={PATHS.sankalp}
            className="mt-5 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-medium text-navy"
          >
            Start a sankalp
          </Link>
        </div>
        <div className="relative min-h-[180px]">
          <MediaImage
            src="/images/sankalp-flowers.png"
            alt="Flowers placed for a sankalp"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-ink">Quick access</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-line"
            >
              <item.icon className="h-5 w-5 text-saffron" />
              <span className="font-medium text-ink">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
