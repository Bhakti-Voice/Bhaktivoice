"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({
  title,
  body,
  placeholder,
  button,
  thanks,
}: {
  title: string;
  body: string;
  placeholder: string;
  button: string;
  thanks: string;
}) {
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }

  return (
    <div>
      <h2 className="font-serif text-lg text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{body}</p>
      {done ? (
        <p className="mt-4 text-sm text-gold">{thanks}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
          <label className="sr-only" htmlFor="newsletter-email">
            {placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder={placeholder}
            className="h-11 w-full rounded-full border-0 bg-white px-4 text-sm text-ink outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-saffron px-5 text-sm font-medium text-white hover:bg-saffron-deep"
          >
            {button}
          </button>
        </form>
      )}
    </div>
  );
}
