import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-card border border-ink/10 bg-paper shadow-[0_1px_2px_rgba(26,19,15,0.04),0_8px_24px_-12px_rgba(26,19,15,0.10)]", className)}
    >
      {children}
    </div>
  );
}
