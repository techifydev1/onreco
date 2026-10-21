import { Suspense } from "react";

import { IntegrationsContent } from "@/features/app/components/IntegrationsPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <IntegrationsContent />
    </Suspense>
  );
}
