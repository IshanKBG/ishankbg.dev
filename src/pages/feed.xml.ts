import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type {APIContext} from "astro";

export const GET  = async (context: APIContext) => {
    const blog = await getCollection('blog');
    return rss({
        title: "Ishan's Blog",
        description: "My blog's rss feed",
        site: context.site!,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            customData: post.data.customData,
            link: `/blog/${post.slug}/`,
        })),
    });
}