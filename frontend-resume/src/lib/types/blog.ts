export interface BlogPostFrontmatter {
	title: string;
	date: string; // ISO 8601 format: YYYY-MM-DD
	description: string;
	tags: string[];
	categories: string[];
	author: string;
	published: boolean;
	coverImage?: string; // Optional: relative path from /static/
	thumbnail?: string; // Optional: relative path from /static/
}

export interface BlogPost {
	slug: string;
	frontmatter: BlogPostFrontmatter;
	content?: string; // Raw markdown content (optional, used for excerpts)
}

export interface BlogPostWithComponent extends BlogPost {
	component: any; // Svelte component from import()
}

export interface BlogListingData {
	posts: BlogPost[];
	totalCount: number;
}

export interface BlogPostData {
	post: BlogPostWithComponent;
	relatedPosts?: BlogPost[];
}
