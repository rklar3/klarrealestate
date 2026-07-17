import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <div>
      <Eyebrow>What clients say</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl">In their words</h2>
      <div className="mt-8 flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.quote}
            className="min-w-[280px] shrink-0 p-6 sm:min-w-0 sm:shrink"
          >
            <p className="text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-muted-1">{testimonial.name}</p>
            <p className="text-xs text-muted-2">{testimonial.context}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
