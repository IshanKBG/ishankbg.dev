import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import shiki from "@astrojs/markdoc/shiki";
export default defineMarkdocConfig({
	extends: [
		shiki({
			theme: 'andromeeda',
			wrap: true,
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
