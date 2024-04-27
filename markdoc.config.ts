import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import shiki from "@astrojs/markdoc/shiki";
export default defineMarkdocConfig({
    extends: [
        shiki({
            theme: 'vitesse-dark',
            wrap: true
        })

    ],
    tags: {
        tweet: {
            render: component("./src/components/Tweet.astro"),
            attributes: {
                id: { type: String },
            },
        },
    },
});