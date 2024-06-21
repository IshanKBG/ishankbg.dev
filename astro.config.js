import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkModifiedTime } from "./src/utils/modified-time.mjs";
import { remarkReadingTime } from "./src/utils/reading-time.mjs";
import cloudflare from "@astrojs/cloudflare";
import embed from "astro-embed/integration";
export default defineConfig({
	site: "https://ishankbg.dev",
	prefetch: true,
	integrations: [tailwind(), sitemap(), embed(), mdx({
		shikiConfig: {
			theme: 'vitesse-dark',
			wrap: true
		},
		remarkPlugins: [remarkModifiedTime, remarkReadingTime],
	})],
	image: {
		domains: ['images.unsplash.com', 'cdn.discordapp.com']
	},
	output: "hybrid",
	adapter: cloudflare({
		imageService: "compile",
	}),
});
