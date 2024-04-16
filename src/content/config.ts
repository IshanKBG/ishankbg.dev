import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: "content",
    schema: {
        title: z.string(),
        tags: z.array(z.string()),
        pubDate: z.date(),
        description: z.string(),
        isDraft: z.boolean(),
    }
});

export const collection = {
   blog:  blogCollection
}

