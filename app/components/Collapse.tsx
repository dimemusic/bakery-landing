import type { ReactNode } from "react";

/** Animated disclosure body (grid-rows trick). Collapsed content is inert: no Tab stops, hidden from AT. */
export default function Collapse({
  open,
  id,
  labelledBy,
  children,
}: {
  open: boolean;
  id: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
