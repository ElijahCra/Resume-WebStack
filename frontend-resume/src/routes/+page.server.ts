import type { PageServerLoad } from './$types';
import { getPublishedPosts } from '$lib/server/blog';

export const load: PageServerLoad = async () => {
	const posts = await getPublishedPosts();

	return {
		recentPosts: posts.slice(0, 3)
	};
};
