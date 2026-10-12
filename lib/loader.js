// صور Cloudinary: أقل جودة مقبولة (eco) + عرض محدود. الصور المحلية بتتقدّم زي ما هي.
export default function loader({ src, width }) {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/"))
    return src.replace(
      "/upload/",
      `/upload/f_auto,q_auto:eco,w_${width},c_limit/`,
    );
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
