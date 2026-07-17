import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "terracotta",
  className,
}: {
  children: React.ReactNode;
  tone?: "terracotta" | "gold";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "terracotta" ? "text-terracotta-dark" : "text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}
