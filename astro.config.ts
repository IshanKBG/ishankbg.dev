import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import markdoc from "@astrojs/markdoc";
import embed from "astro-embed/integration"

// https://astro.build/config
export default defineConfig({
	site: "https://ishankbg.dev",
	prefetch: true,
	integrations: [tailwind(), sitemap(), markdoc(), embed({
	}), mdx()],
	markdown: {
		shikiConfig: {
			theme: 'vitesse-dark',
			wrap: true
		},
	},
	image: {
		domains: ['images.unsplash.com', 'cdn.discordapp.com']
	}
}); 
