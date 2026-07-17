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
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
  ariaLabel?: string;
}) {
  return (
    <As
      className={cn("py-16 sm:py-24", toneClasses[tone], className)}
      aria-label={ariaLabel}
    >
      <Container className={containerClassName}>{children}</Container>
    </As>
  );
}
