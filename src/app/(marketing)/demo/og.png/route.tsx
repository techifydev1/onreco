import { demoOgImage } from "@/features/marketing/og/marketing-og";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function GET() {
    return demoOgImage();
}
