import { BASIC_URL } from "@/lib/config";

export async function GET() {
  const siteUrl = BASIC_URL;

  const staticPages = ["", "products", "categories", "about-us", "contact-us"];

  const res = await fetch(`${BASIC_URL}/api/product/get-published`);
  const data = await res.json();
  const productPages = data?.data?.products
    ?.filter((item) => item._id)
    ?.map((item) => `product/${item._id}`);

  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
      <url>
        <loc>https://glamish-beauty.vercel.app/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400", // Cache for 1 day
    },
  });
}
