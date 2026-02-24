import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://titusz.org",
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    // moves
    "/opinion/cryptobiosis": "/stories/cryptobiosis",
    "/blog/lightsaber-the-fascination": "/stories/lightsaber-the-fascination",
    "/projects/3d-character-animation-in-the-beginnings":
      "/stories/3d-character-animation-in-the-beginnings",
  },
});
