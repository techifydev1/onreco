import { demoOgImage } from "@/features/marketing/og/marketing-og";

export const alt = "Onreco product tour - two minutes from payment to books.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return demoOgImage();
}
