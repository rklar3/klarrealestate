export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "Do I need a REALTOR® to buy a home in the Okanagan?",
    answer:
      "It's not legally required, but a local REALTOR® gives you access to the MLS® system, negotiates on your behalf, and manages the contract and inspection process. In BC, the seller typically pays the commission split between both agents, so buyer representation usually costs you nothing directly.",
  },
  {
    question: "What areas does Klar Real Estate serve?",
    answer:
      "Sanam works throughout the Okanagan Valley, with a focus on Kelowna, West Kelowna, Penticton, Vernon, and Summerland. See the area guides for details on each community.",
  },
  {
    question: "How quickly do homes sell in the Okanagan right now?",
    answer:
      "It varies significantly by community, price point, and season. Get in touch for a current read on the market for the specific area and price range you're considering.",
  },
  {
    question: "Can you help if I'm buying from out of town or out of province?",
    answer:
      "Yes — a significant share of Okanagan buyers are relocating from elsewhere in BC or from other provinces. Virtual tours, detailed area guidance, and flexible scheduling for visits are all part of the process.",
  },
];

export const buyFaqs: Faq[] = [
  {
    question: "What's the general process for buying a home in BC?",
    answer:
      "Broadly: get pre-approved for financing, define your search criteria, tour properties, submit an offer (often with subject clauses for financing and inspection), negotiate terms, remove subjects once satisfied, and complete at a lawyer or notary's office on the completion date.",
  },
  {
    question: "How much do I need for a down payment?",
    answer:
      "In Canada, minimum down payments are 5% on the first $500,000 of the purchase price, 10% on the portion between $500,000 and $999,999, and 20% on $1,000,000 and above. Anything under 20% down typically requires mortgage default insurance, which adds a premium to your mortgage.",
  },
  {
    question: "What are 'subjects' or 'conditions' in a BC offer?",
    answer:
      "Subjects are conditions that must be satisfied before a sale becomes firm — commonly financing approval, a satisfactory home inspection, and review of strata documents for a condo or townhome. They protect the buyer and give a window to walk away without penalty if something doesn't check out.",
  },
  {
    question: "What closing costs should I budget for beyond the purchase price?",
    answer:
      "Typical BC closing costs include the Property Transfer Tax (waived or reduced for qualifying first-time buyers), legal/notary fees, a home inspection, property insurance, and adjustments for prepaid utilities or strata fees. Budgeting 1.5–2% of the purchase price for closing costs is a reasonable starting point.",
  },
  {
    question: "Is a first-time buyer program available in BC?",
    answer:
      "Yes — the BC First Time Home Buyers' Program can reduce or eliminate Property Transfer Tax on qualifying purchases, and federal programs like the First Home Savings Account (FHSA) and Home Buyers' Plan (RRSP withdrawal) can help with the down payment. Eligibility rules change periodically, so confirm current details with a mortgage professional.",
  },
];

export function areaFaqs(areaName: string): Faq[] {
  return [
    {
      question: `What's it like living in ${areaName}, BC?`,
      answer: `${areaName} has its own pace and character compared to the rest of the Okanagan Valley — see the guide above for a fuller picture of lifestyle, amenities, and who tends to be drawn to the area.`,
    },
    {
      question: `Do you help buyers and sellers specifically in ${areaName}?`,
      answer: `Yes — Sanam works throughout the Okanagan Valley, including ${areaName}, and can speak to current listings, pricing context, and neighbourhood-level detail for the area.`,
    },
    {
      question: `Can I see current listings in ${areaName}?`,
      answer: `Yes — the listings page can be filtered to show homes in ${areaName} specifically. Get in touch if you'd like a rundown of what's currently available or coming soon.`,
    },
  ];
}

export const sellFaqs: Faq[] = [
  {
    question: "How long does it typically take to sell a home in the Okanagan?",
    answer:
      "Timelines vary by community, season, price point, and current market conditions. A pricing and marketing conversation up front will give you a realistic estimate for your specific property.",
  },
  {
    question: "How is my home's list price determined?",
    answer:
      "Pricing draws on recent comparable sales in your specific neighbourhood, current active competition, property condition, and market trend direction — not just an average of what similar homes have sold for in the past.",
  },
  {
    question: "Do I need to stage my home before listing?",
    answer:
      "Full professional staging isn't always necessary, but decluttering, depersonalizing, and addressing obvious repairs consistently improve both showing turnout and final sale price. Recommendations are tailored to the specific property.",
  },
  {
    question: "What does Sanam's marketing for a listing typically include?",
    answer:
      "Professional photography, an MLS® listing optimized for search, targeted social promotion, and coordination of showings — scaled to fit the property and market. Ask for specifics when you book a listing consultation.",
  },
  {
    question: "How much does it cost to sell my home?",
    answer:
      "Selling costs typically include real estate commission (negotiated with your agent), legal/notary fees, and any agreed-upon repairs or staging costs. A full breakdown for your specific property is provided before you list.",
  },
];
