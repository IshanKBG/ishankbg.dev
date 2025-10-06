import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"
const parser = new MarkdownIt()
export const GET = async (context: APIContext) => {
	const blog = await getCollection("blog")
	return rss({
		xmlns: { atom: "http://www.w3.org/2005/Atom" },
		title: "Ishan's Blog",
		description:
			"I am a computer programmer and a tech enthusiast. I write about programming, tech, and other things that interest me.",
		stylesheet: "/styles.xsl",
		site: context.site!,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
			tags: post.data.tags,
			customData: post.data.customData,
			link: `/archive/${post.slug}/`,
		})),
	})
}
