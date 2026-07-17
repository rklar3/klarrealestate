"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";

export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className="divide-y divide-ink/10 rounded-card bg-paper"
    >
      {items.map((item, index) => (
        <RadixAccordion.Item key={item.question} value={`item-${index}`}>
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink hover:text-terracotta-dark">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="shrink-0 text-xl text-terracotta transition-transform duration-200 group-data-[state=open]:rotate-45"
              >
                +
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden px-6 text-muted-1 data-[state=open]:pb-5 data-[state=open]:pt-0">
            <p>{item.answer}</p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
