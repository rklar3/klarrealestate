import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

// Minimal page header: quiet paper band, hairline rule, restrained type.
// `action` sits top-right on wide screens; `compact` trims the vertical space
// for data-first pages.
export function PageHeader({
  title,
  children,
  action,
  compact = false,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <header
      className={cn(
        "border-b border-ink/10 bg-paper text-ink",
        compact ? "pb-6 pt-8 sm:pb-7 sm:pt-10" : "pb-10 pt-12 sm:pb-12 sm:pt-16",
      )}
    >
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div>
          <h1 className="max-w-2xl text-3xl sm:text-4xl">{title}</h1>
          {children && (
            <div className="mt-2 max-w-2xl text-base text-muted-1 [&_p]:text-muted-1">{children}</div>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </Container>
    </header>
  );
}
