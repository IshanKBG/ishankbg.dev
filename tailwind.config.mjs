/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['"IBM Plex Sans"', "sans-serif"],
			serif: ['"IBM Plex Serif"', "serif"],
			mono: ['"IBM Plex Mono"', "monospace"],
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
