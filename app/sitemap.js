const URL_ = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
export default function sitemap(){return [{url:URL_,lastModified:new Date(),priority:1}]}
