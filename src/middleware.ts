import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url);

	if (url.pathname.startsWith('/blog/')) {
		const newUrl = url.pathname.replace('/blog/' || '/blog', '/archive/');
		return context.redirect(newUrl, 302);
	}
	return next();
});

