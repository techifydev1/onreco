import type { MetadataRoute } from "next";

import { env } from "@/config/env";
import { getAllPostSlugs, getPost } from "@/app/(marketing)/blog/_data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${env.siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${env.siteUrl}/demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${env.siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${env.siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getAllPostSlugs().map((slug) => {
      const post = getPost(slug);
      return {
        url: `${env.siteUrl}/blog/${slug}`,
        lastModified: post?.modifiedTime
          ? new Date(post.modifiedTime)
          : post?.publishedTime
            ? new Date(post.publishedTime)
            : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
  ];
}
