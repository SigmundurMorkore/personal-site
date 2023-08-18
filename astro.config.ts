import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://sigmundur.morkore.fo",
  integrations: [mdx(), sitemap()],
  output: "server",
  experimental: {
    assets: true,
    viewTransitions: true
  },
  adapter: node({
    mode: "standalone"
  })
});