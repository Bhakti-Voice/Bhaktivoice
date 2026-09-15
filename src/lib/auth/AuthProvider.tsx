"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isFirebaseConfigured } from "./firebase-config";

type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  getIdToken: () => Promise<string>;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  configured: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    let unsub: (() => void) | undefined;

    const initAuth = () => {
      void (async () => {
        const [{ getFirebaseAuth }, { onAuthStateChanged }] = await Promise.all([
          import("./firebase"),
          import("firebase/auth"),
        ]);
        if (cancelled) return;
        const auth = getFirebaseAuth();
        if (!auth) {
          setLoading(false);
          return;
        }
        unsub = onAuthStateChanged(auth, async (next) => {
          setUser(next);
          setLoading(false);
          if (!next) return;
          const token = await next.getIdToken();
          await fetch("/api/auth/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: next.email,
              name: next.displayName,
              photoUrl: next.photoURL,
            }),
          }).catch(() => undefined);
        });
      })();
    };

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(initAuth, { timeout: 2000 });
    } else {
      timerId = setTimeout(initAuth, 500);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
      unsub?.();
    };
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      signInWithGoogle: async () => {
        const [{ getFirebaseAuth, googleProvider }, { signInWithPopup }] = await Promise.all([
          import("./firebase"),
          import("firebase/auth"),
        ]);
        const auth = getFirebaseAuth();
        if (!auth) throw new Error("Firebase is not configured yet.");
        await signInWithPopup(auth, googleProvider());
      },
      logout: async () => {
        const [{ getFirebaseAuth }, { signOut }] = await Promise.all([
          import("./firebase"),
          import("firebase/auth"),
        ]);
        const auth = getFirebaseAuth();
        if (auth) await signOut(auth);
      },
    }),
    [configured, loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
