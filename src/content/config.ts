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

const aboutCollection = defineCollection({
	type: "content",
	schema: {
		title: z.string(),
	},
})

export const collection = {
	blog: blogCollection,
	about: aboutCollection,
}
