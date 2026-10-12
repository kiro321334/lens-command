export const isCld = (u) =>
  typeof u === "string" &&
  u.includes("res.cloudinary.com") &&
  u.includes("/upload/");
const tx = (u, t) => u.replace("/upload/", `/upload/${t}/`);
const ext = (u, e) => u.replace(/\.[a-z0-9]+(\?.*)?$/i, `.${e}`);
// صورة للعرض (للصور = نفس الرابط، للفيديو = أول فريم من Cloudinary)
export function posterSrc(m) {
  if (!m?.url) return null;
  if (m.type !== "video") return m.url;
  return isCld(m.url)
    ? ext(tx(m.url, "so_0,f_jpg,w_640,c_limit,q_auto:eco"), "jpg")
    : null;
}
// عرض الفيديو للزائر (أقل رقم = استهلاك أقل). 480 كافي للموبايل، ارفعه لـ 720 لو عايز جودة أعلى
export const OPTIMIZE_VIDEO = false; // false = الـ mp4 بيتقدّم زي ما اترفع
export const VIDEO_WIDTH = 480;
export function videoSrc(m) {
  if (!m?.url) return null;
  if (!isCld(m.url)) return m.url;
  if (/\.mp4(\?|$)/i.test(m.url) && !OPTIMIZE_VIDEO) return m.url;
  return ext(tx(m.url, `q_auto:eco,w_${VIDEO_WIDTH},c_limit,vc_h264`), "mp4");
}
// غلاف المشروع: الغلاف المرفوع، وإلا أول ملف في المعرض
export function coverOf(p) {
  if (p.cover?.url) return posterSrc(p.cover);
  const g = (p.gallery || []).find((x) => x.media?.url);
  return g ? posterSrc(g.media) : null;
}
// صورة مصغّرة خفيفة لعرضها في الداشبورد
export const thumb = (u) =>
  isCld(u) && !u.includes("/upload/so_0,")
    ? u.replace("/upload/", "/upload/w_320,c_limit,q_auto/")
    : u;
