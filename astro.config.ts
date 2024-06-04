import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import embed from "astro-embed/integration"
import { remarkReadingTime } from "./readming-time.mjs";
// https://astro.build/config
export default defineConfig({
	site: "https://ishankbg.dev",
	prefetch: true,
	integrations: [tailwind(), sitemap(), embed(), mdx()],
	markdown: {
		shikiConfig: {
			theme: 'vitesse-dark',
			wrap: true
		},
		remarkPlugins: [remarkReadingTime]
	},
	image: {
		domains: ['images.unsplash.com', 'cdn.discordapp.com']
	}
}); 
