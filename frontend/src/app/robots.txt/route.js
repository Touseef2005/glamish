export function GET() {
    const content = `
  User-agent: *
  Allow: /
  
  Sitemap: https://glamish-beauty.vercel.app/sitemap.xml
  `;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
