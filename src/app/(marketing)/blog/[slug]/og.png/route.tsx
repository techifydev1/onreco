import { blogPostOgImage } from "@/features/marketing/og/blog-og";
import { getPost } from "../../_data/posts";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        return new Response("Not found", { status: 404 });
    }

    return blogPostOgImage(post);
}
