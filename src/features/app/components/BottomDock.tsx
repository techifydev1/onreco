"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

import { appNav } from "../content";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";

/**
 * Floating navigation dock, pinned to the bottom of the viewport.
 */
export function BottomDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="App navigation"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded border border-hairline bg-paper-card/92 p-1.5 shadow-[0_18px_44px_-16px_rgba(35,61,50,0.28)] backdrop-blur-md">
        {appNav.map((item) => {
          const active =
            item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
          const icon = <AppIcon name={item.icon as AppIconName} size={18} />;

          if (!item.available) {
            return (
              <span
                key={item.id}
                aria-disabled="true"
                title={`${item.label} — coming soon`}
                className="flex shrink-0 cursor-default items-center gap-2 rounded-chip px-2.5 py-2 text-stone opacity-45"
              >
                {icon}
                <span className="hidden text-[12px] xl:inline">{item.label}</span>
              </span>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-chip px-2.5 py-2",
                "transition-colors duration-200",
                active ? "bg-sage2 text-ink" : "text-moss hover:bg-sage hover:text-ink",
              )}
            >
              {icon}
              <span className="hidden text-[12px] xl:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
