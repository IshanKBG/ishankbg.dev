import { defineCollection, z } from "astro:content"

const blogCollection = defineCollection({
	type: "content",
	schema: {
		title: z.string(),
		tags: z.array(z.string()),
		pubDate: z.date(),
		description: z.string(),
		draft: z.boolean().optional().default(false),
	},
})
export const collection = {
	blog: blogCollection,
}
