import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type Tone = "cream" | "sand" | "ink" | "paper";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream",
  paper: "bg-paper text-ink",
};

export function Section({
  children,
  tone = "cream",
  className,
  containerClassName,
  as: As = "section",
  ariaLabel,
  tight = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
  ariaLabel?: string;
  /** Compact vertical rhythm for data-dense pages. */
  tight?: boolean;
}) {
  return (
    <As
      className={cn(tight ? "py-10 sm:py-14" : "py-20 sm:py-28", toneClasses[tone], className)}
      aria-label={ariaLabel}
    >
      <Container className={containerClassName}>{children}</Container>
    </As>
  );
}
