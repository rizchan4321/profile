import type { NextConfig } from "next";

// `npm run build:xampp` exports static HTML to /out, served by XAMPP Apache at
// http://localhost/profile/out/. Normal `npm run build` (server deploy) is unchanged.
const xampp = process.env.npm_lifecycle_event === "build:xampp";
const basePath = xampp ? "/profile/out" : "";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(xampp && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
