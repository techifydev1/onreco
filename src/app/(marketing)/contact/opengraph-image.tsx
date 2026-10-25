import { contactOgImage } from "@/features/marketing/og/marketing-og";

export const alt = "Contact Onreco - tell us what your payments look like.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return contactOgImage();
}
