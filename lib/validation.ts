import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address"),
  intent: z.enum(["buy", "sell", "both", "exploring"], {
    message: "Please let us know what you're looking to do",
  }),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  listingSlug: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please confirm you agree to be contacted",
  }),
  // Honeypot: real users never fill this in; bots frequently do.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const valuationSchema = z.object({
  address: z.string().trim().min(1, "Please enter the property address").max(200),
  city: z.string().trim().min(1, "Please select a city").max(60),
  propertyType: z.enum(["House", "Condo", "Townhome", "Other"]),
  beds: z.string().trim().max(10).optional().or(z.literal("")),
  baths: z.string().trim().max(10).optional().or(z.literal("")),
  approxSqft: z.string().trim().max(20).optional().or(z.literal("")),
  name: z.string().trim().min(1, "Please enter your name").max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address"),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Please confirm you agree to be contacted",
  }),
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ValuationInput = z.infer<typeof valuationSchema>;
