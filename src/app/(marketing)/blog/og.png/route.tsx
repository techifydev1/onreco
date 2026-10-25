import { blogIndexOgImage } from "@/features/marketing/og/blog-og";
import { blogPosts } from "../_data/posts";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function GET() {
    return blogIndexOgImage(Object.values(blogPosts));
}
