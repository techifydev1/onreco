import { permanentRedirect } from "next/navigation";

// The end user license agreement now lives at /terms.
export default function EulaPage() {
  permanentRedirect("/terms");
}
