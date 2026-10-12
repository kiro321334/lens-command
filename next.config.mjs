const longCache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }];
export default {
  reactStrictMode: true, poweredByHeader: false, compress: true,
  // لودر مخصص: صور Cloudinary بتتحسّن على Cloudinary نفسه (مجاناً)، والصور المحلية بتتقدّم زي ما هي
  images: { loader: 'custom', loaderFile: './lib/loader.js', deviceSizes: [480, 828, 1200], imageSizes: [96, 320] },
  async headers() {
    return ['/hero.jpg', '/logo.png', '/icon.png', '/apple-icon.png', '/favicon.ico'].map((source) => ({ source, headers: longCache }));
  },
};
