import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://ishankbg.dev",
    integrations: [tailwind()],
    image: {
        domains: ['images.unsplash.com', 'cdn.discordapp.com']
    }
});