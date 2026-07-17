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
      className={cn("rounded-card border border-ink/10 bg-paper", className)}
    >
      {children}
    </div>
  );
}
