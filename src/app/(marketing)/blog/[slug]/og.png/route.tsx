import { blogPostOgImage } from "@/features/marketing/og/blog-og";
import { getAllPostSlugs, getPost } from "../../_data/posts";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const dynamic = "force-static";

export function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

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
