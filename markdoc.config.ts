import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import shiki from "@astrojs/markdoc/shiki";
import { transformerCompactLineOptions } from "@shikijs/transformers";
export default defineMarkdocConfig({
	extends: [
		shiki({
			theme: 'andromeeda',
			wrap: true,
			transformers: [transformerCompactLineOptions()]
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
