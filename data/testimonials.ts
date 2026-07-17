// TODO: real client testimonials. These are placeholder examples only —
// do not treat as real, attributed reviews. Replace with actual client
// quotes (with permission) before launch.

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "[Placeholder] Sanam walked us through every step of buying our first home in Kelowna and never made us feel rushed.",
    name: "Placeholder client",
    context: "Buyer, Kelowna — example only, TODO replace with real testimonial",
  },
  {
    quote:
      "[Placeholder] Our home sold faster than we expected, and the whole process felt organized from day one.",
    name: "Placeholder client",
    context: "Seller, West Kelowna — example only, TODO replace with real testimonial",
  },
  {
    quote:
      "[Placeholder] Knowledgeable about the Naramata Bench market specifically, which mattered a lot for what we were looking for.",
    name: "Placeholder client",
    context: "Buyer, Penticton — example only, TODO replace with real testimonial",
  },
];
