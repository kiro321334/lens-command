"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { posterSrc, thumb } from "@/lib/cloud";
// حدود توفير الكريديت — عدّلها من هنا
const MAX_VIDEO_MB = 30,
  MAX_VIDEO_SEC = 60,
  MAX_IMG_EDGE = 1600,
  IMG_QUALITY = 0.8;
const guess = (u) =>
  /\.(mp4|mov|webm|m4v)(\?|$)/i.test(u) ? "video" : "image";
const mb = (n) => (n / 1048576).toFixed(1);
// يصغّر الصورة في المتصفح قبل الرفع (WebP، حد أقصى 1600px) — لو النتيجة أكبر من الأصل بنرفع الأصل
async function compressImage(file) {
  if (!file.type.startsWith("image/") || /gif|svg/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    const k = Math.min(1, MAX_IMG_EDGE / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    bmp.close?.();
    let type = "image/webp",
      blob = await new Promise((r) => c.toBlob(r, type, IMG_QUALITY));
    if (!blob || blob.type !== type) {
      type = "image/jpeg";
      blob = await new Promise((r) => c.toBlob(r, type, IMG_QUALITY));
    }
    if (!blob || blob.size >= file.size) return file;
    return new File(
      [blob],
      file.name.replace(/\.[^.]+$/, "") +
        (type === "image/webp" ? ".webp" : ".jpg"),
      { type },
    );
  } catch {
    return file;
  }
}
const videoDuration = (file) =>
  new Promise((ok) => {
    const v = document.createElement("video"),
      u = URL.createObjectURL(file);
    v.preload = "metadata";
    v.onloadedmetadata = () => {
      URL.revokeObjectURL(u);
      ok(v.duration);
    };
    v.onerror = () => {
      URL.revokeObjectURL(u);
      ok(0);
    };
    v.src = u;
  });
export default function MediaField({
  label,
  value,
  onChange,
  kind = "both",
  hint,
}) {
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const accept =
    kind === "image"
      ? "image/*"
      : kind === "video"
        ? "video/*"
        : "image/*,video/*";
  const headers = async () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
  });
  async function pick(e) {
    let f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const isV = f.type.startsWith("video");
    setErr("");
    setInfo("");
    if (isV) {
      if (f.size > MAX_VIDEO_MB * 1048576)
        return setErr(
          `الفيديو ${mb(f.size)}MB — الحد الأقصى ${MAX_VIDEO_MB}MB للحفاظ على الرصيد. اضغطه الأول (480p–720p) بـ HandBrake أو CapCut.`,
        );
      const d = await videoDuration(f);
      if (d > MAX_VIDEO_SEC)
        return setErr(
          `الفيديو ${Math.round(d)} ثانية — الحد الأقصى ${MAX_VIDEO_SEC} ثانية. قصّه أو اختصره.`,
        );
    } else {
      const before = f.size;
      f = await compressImage(f);
      if (f.size < before)
        setInfo(`الصورة اتصغّرت: ${mb(before)}MB ← ${mb(f.size)}MB`);
      if (f.size > 10 * 1048576)
        return setErr("الصورة لسه أكبر من 10MB، صغّرها الأول.");
    }
    setP(0);
    try {
      const s = await fetch("/api/sign", {
        method: "POST",
        headers: await headers(),
        body: JSON.stringify({ resourceType: isV ? "video" : "image" }),
      }).then((r) => r.json());
      if (s.error) throw new Error(s.error);
      const fd = new FormData();
      fd.append("file", f);
      fd.append("api_key", s.apiKey);
      fd.append("timestamp", s.timestamp);
      fd.append("signature", s.signature);
      fd.append("folder", s.folder);
      const res = await new Promise((ok, no) => {
        const x = new XMLHttpRequest();
        x.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${s.cloudName}/${s.resourceType}/upload`,
        );
        x.upload.onprogress = (ev) =>
          ev.lengthComputable && setP(Math.round((ev.loaded / ev.total) * 100));
        x.onload = () => {
          try {
            const j = JSON.parse(x.responseText);
            x.status < 300
              ? ok(j)
              : no(new Error(j.error?.message || "Upload failed"));
          } catch (er) {
            no(er);
          }
        };
        x.onerror = () => no(new Error("Network error"));
        x.send(fd);
      });
      onChange({
        url: res.secure_url,
        publicId: res.public_id,
        type: s.resourceType,
      });
    } catch (er) {
      setErr(er.message);
    }
    setP(null);
  }
  async function remove() {
    if (!confirm("Remove this file?")) return;
    if (value?.publicId) {
      try {
        await fetch("/api/delete", {
          method: "POST",
          headers: await headers(),
          body: JSON.stringify({
            publicId: value.publicId,
            resourceType: value.type,
          }),
        });
      } catch {}
    }
    onChange(null);
  }
  const prev = value?.url ? thumb(posterSrc(value) || "") : "";
  return (
    <div className="grid gap-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-mute">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-bg/60 p-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-panel2 text-xs text-mute">
          {prev ? (
            <img src={prev} alt="" className="h-full w-full object-cover" />
          ) : value?.url ? (
            "🎬"
          ) : (
            "Empty"
          )}
        </div>
        <div className="grid flex-1 gap-2">
          <div className="flex flex-wrap gap-2">
            <label className="cursor-pointer rounded-lg bg-violet px-3 py-2 text-xs font-extrabold text-white">
              {p !== null
                ? `Uploading ${p}%`
                : value?.url
                  ? "Replace"
                  : "Upload"}
              <input
                type="file"
                accept={accept}
                onChange={pick}
                disabled={p !== null}
                className="hidden"
              />
            </label>
            {value?.url && (
              <button
                type="button"
                onClick={remove}
                className="rounded-lg border border-line px-3 py-2 text-xs font-bold text-red-300"
              >
                Remove
              </button>
            )}
          </div>
          {p !== null && (
            <div className="h-1.5 overflow-hidden rounded-full bg-panel2">
              <div
                className="h-full bg-violet transition-all"
                style={{ width: `${p}%` }}
              />
            </div>
          )}
        </div>
      </div>
      <span className="text-[11px] text-cream/45">
        {hint ||
          (kind === "image"
            ? "الصور بتتصغّر تلقائياً قبل الرفع"
            : `فيديو حتى ${MAX_VIDEO_MB}MB و${MAX_VIDEO_SEC} ثانية — الأفضل 480p–720p`)}
      </span>
      {info && (
        <span className="text-xs font-bold text-emerald-300">{info}</span>
      )}
      {err && <span className="text-xs font-bold text-red-300">{err}</span>}
    </div>
  );
}
