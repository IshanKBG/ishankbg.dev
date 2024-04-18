import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ishankbg.dev",
  integrations: [tailwind(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true
    }
  },
  image: {
    domains: ['images.unsplash.com', 'cdn.discordapp.com']
  }
});