"use client";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { auth, db, configured } from "@/lib/firebase";
import defaults from "@/lib/defaults";
import { merge } from "@/lib/merge";
import General from "./tabs/General";
import Hero from "./tabs/Hero";
import Projects from "./tabs/Projects";
import Ugc from "./tabs/Ugc";
import Messages from "./tabs/Messages";
import Services from "./tabs/Services";
import Process from "./tabs/Process";
import Faq from "./tabs/Faq";
import Contact from "./tabs/Contact";
const TABS = [
  ["messages", "Messages", Messages],
  ["general", "General & SEO", General],
  ["hero", "Hero & Stats", Hero],
  ["projects", "Projects", Projects],
  ["ugc", "UGC", Ugc],
  ["services", "Services", Services],
  ["process", "Process", Process],
  ["faq", "FAQ", Faq],
  ["contact", "Contact & Links", Contact],
];
const setIn = (o, path, v) => {
  const [k, ...r] = path.split(".");
  return { ...o, [k]: r.length ? setIn(o[k] ?? {}, r.join("."), v) : v };
};
const inp =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-base focus:border-violet focus:outline-none";
export default function AdminApp() {
  const [user, setUser] = useState(undefined);
  const [c, setC] = useState(null);
  const [tab, setTab] = useState("messages");
  const [msgs, setMsgs] = useState([]);
  const [msgErr, setMsgErr] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!configured) {
      setUser(null);
      return;
    }
    return onAuthStateChanged(auth, setUser);
  }, []);
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "site", "content"))
      .then((s) => {
        const j = s.exists() ? s.data().json : null;
        setC(merge(defaults, j ? JSON.parse(j) : {}));
      })
      .catch((e) => {
        setMsg({ bad: true, t: "Load failed: " + e.message });
        setC(defaults);
      });
  }, [user]);
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(200),
    );
    return onSnapshot(
      q,
      (s) => {
        setMsgErr("");
        setMsgs(
          s.docs.map((d) => {
            const x = d.data();
            return { id: d.id, ...x, at: x.createdAt?.toDate?.() };
          }),
        );
      },
      (e) => setMsgErr(e.message),
    );
  }, [user]);
  useEffect(() => {
    const f = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", f);
    return () => window.removeEventListener("beforeunload", f);
  }, [dirty]);
  const set = (path, v) => {
    setC((p) => setIn(p, path, v));
    setDirty(true);
    setMsg(null);
  };
  async function login(e) {
    e.preventDefault();
    setErr("");
    const d = new FormData(e.currentTarget);
    try {
      await signInWithEmailAndPassword(auth, d.get("email"), d.get("password"));
    } catch {
      setErr("Wrong email or password");
    }
  }
  async function save() {
    setBusy(true);
    setMsg(null);
    try {
      await setDoc(doc(db, "site", "content"), {
        json: JSON.stringify(c),
        updatedAt: serverTimestamp(),
      });
      const r = await fetch("/api/revalidate", {
        method: "POST",
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      setDirty(false);
      setMsg(
        r.ok
          ? { t: "✅ Saved & published — the site is updated" }
          : {
              bad: true,
              t: "Saved, but the site cache was not refreshed (check ADMIN_UID). It will refresh within 5 minutes.",
            },
      );
    } catch (e) {
      setMsg({
        bad: true,
        t: "Save failed: " + e.message + " — check Firestore rules & ADMIN_UID",
      });
    }
    setBusy(false);
  }
  if (user === undefined)
    return <p className="p-10 text-center text-mute">Loading…</p>;
  if (!user)
    return (
      <main className="grid min-h-svh place-items-center p-5">
        <form
          onSubmit={login}
          className="grid w-full max-w-sm gap-4 rounded-3xl border border-line bg-panel p-6"
        >
          <h1 className="font-display text-4xl font-bold uppercase">
            Dashboard
          </h1>
          <p className="text-sm text-mute">Sign in to manage your website.</p>
          {!configured && (
            <p className="rounded-xl bg-red-500/10 p-3 text-xs font-bold text-red-300">
              Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_*
              variables to .env.local.
            </p>
          )}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className={inp}
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            className={inp}
          />
          {err && <p className="text-sm font-bold text-red-300">{err}</p>}
          <button className="btn-p w-full">Sign in</button>
        </form>
      </main>
    );
  if (!c) return <p className="p-10 text-center text-mute">Loading content…</p>;
  const Active = TABS.find((t) => t[0] === tab)[2];
  const isMsg = tab === "messages";
  const unread = msgs.filter((m) => !m.read).length;
  return (
    <div className="min-h-svh pb-28">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <h1 className="font-display text-2xl font-bold uppercase">
            Dashboard
          </h1>
          <div className="flex gap-2 text-xs font-bold">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-3 py-2"
            >
              View site ↗
            </a>
            <button
              onClick={() => signOut(auth)}
              className="rounded-lg border border-line px-3 py-2"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="noscroll mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-3">
          {TABS.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-bold ${tab === k ? "bg-violet text-white" : "bg-panel text-mute"}`}
            >
              {l}
              {k === "messages" && unread > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] text-white">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-5">
        {isMsg ? (
          <Messages msgs={msgs} err={msgErr} />
        ) : (
          <Active c={c} set={set} />
        )}
      </main>
      {!isMsg && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 p-3 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <p
              className={`flex-1 text-xs font-bold ${msg?.bad ? "text-red-300" : "text-cream/80"}`}
            >
              {msg ? msg.t : dirty ? "● Unsaved changes" : "All changes saved"}
            </p>
            <button
              onClick={save}
              disabled={busy || !dirty}
              className="btn-p w-auto px-8 disabled:opacity-40"
            >
              {busy ? "Saving…" : "Save & publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
