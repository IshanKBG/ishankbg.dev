import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type {APIContext} from "astro";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();
export const GET  = async (context: APIContext) => {
    const blog = await getCollection('blog');
    return rss({
        title: "Ishan's Blog",
        description: "My blog's rss feed",
        stylesheet: "/styles.xsl",
        site: context.site!,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            content: sanitizeHtml(parser.render(post.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
            customData: post.data.customData,
            link: `/blog/${post.slug}/`,
        })),
    });
}