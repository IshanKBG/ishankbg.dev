import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./readming-time.mjs";
import cloudflare from "@astrojs/cloudflare";
import embed from "astro-embed/integration";
export default defineConfig({
	site: "https://ishankbg.dev",
	prefetch: true,
	integrations: [tailwind(), sitemap(), embed(), mdx()],
	markdown: {
		shikiConfig: {
			theme: 'vitesse-dark',
			wrap: true
		},
		remarkPlugins: [remarkReadingTime],
	},
	image: {
		domains: ['images.unsplash.com', 'cdn.discordapp.com']
	},
	output: "hybrid",
	adapter: cloudflare(),
});
