import type { ServiceAreaSlug } from "@/data/site";

export type AreaGuide = {
  slug: ServiceAreaSlug;
  name: string;
  tagline: string;
  intro: string[];
  lifestyle: string[];
  suitedFor: string[];
  thingsToDo: string[];
  housingContext: string;
  image: string;
};

export const areas: AreaGuide[] = [
  {
    slug: "kelowna",
    name: "Kelowna",
    tagline: "The Okanagan's largest city, built around the lake",
    intro: [
      "Kelowna is the commercial and cultural hub of the Okanagan Valley, stretched along the western edge of Okanagan Lake. It's the region's largest city, with the amenities to match: a full hospital, a university campus (UBC Okanagan), a regional airport, and a downtown core that's grown up considerably over the last decade.",
      "Neighbourhoods range from the walkable downtown core and Pandosy Village to family-oriented subdivisions in the Lower Mission, Glenmore, and Rutland, each with a distinct feel and price point.",
    ],
    lifestyle: [
      "Downtown Kelowna and the waterfront boardwalk anchor a dense restaurant, patio, and event scene through the summer months.",
      "The Mission neighbourhoods (Lower and Upper Mission) trend toward larger family homes, good schools, and quick access to beaches.",
      "Wine touring is part of daily life here — the Kelowna area alone is home to dozens of wineries within a short drive.",
    ],
    suitedFor: [
      "Buyers who want city amenities (hospital, airport, shopping, dining) alongside lake access",
      "Families prioritizing school choice and established neighbourhoods",
      "Remote workers and retirees drawn to the four-season outdoor lifestyle",
    ],
    thingsToDo: [
      "Okanagan Lake beaches and the Waterfront Boardwalk",
      "Knox Mountain Park hiking and biking trails",
      "Kelowna Cultural District (art gallery, museums, live theatre)",
      "Wine touring through the Kelowna and Lake Country wine trails",
    ],
    housingContext:
      "Kelowna's housing stock spans downtown condos and townhomes through to acreages on the city's outskirts, which means a wider range of entry points than the smaller Okanagan communities. Pricing and inventory shift by neighbourhood — talk to Sanam about what a given budget looks like in Kelowna's current market.",
    image: "kelowna",
  },
  {
    slug: "west-kelowna",
    name: "West Kelowna",
    tagline: "Lake-facing communities across the water from downtown Kelowna",
    intro: [
      "West Kelowna sits on the western shore of Okanagan Lake, connected to Kelowna by the William R. Bennett Bridge. It's grown quickly over the past two decades while keeping a slightly quieter, more residential feel than its neighbour across the water.",
      "The area covers a mix of waterfront and lake-view communities — Lakeview Heights, Rose Valley, Shannon Lake, and the West Kelowna Estates area among them — plus a strong concentration of orchards and vineyards along the benches above the lake.",
    ],
    lifestyle: [
      "West Kelowna is known for its wineries — the Westside Wine Trail includes some of the Okanagan's most-visited estates.",
      "Waterfront and lake-view properties here are often more attainable than comparable Kelowna listings, without giving up the commute.",
      "A growing retail and restaurant base along Highway 97 has reduced the need to cross the bridge for day-to-day errands.",
    ],
    suitedFor: [
      "Buyers chasing lake or vineyard views with a shorter commute to Kelowna",
      "Wine-country enthusiasts wanting to be close to the Westside Wine Trail",
      "Move-up buyers looking for larger lots than central Kelowna typically offers",
    ],
    thingsToDo: [
      "Westside Wine Trail wineries and tasting rooms",
      "Gellatly Bay waterfront park and boat launch",
      "Rose Valley and Mount Boucherie hiking trails",
      "Quick access to Kelowna International Airport and downtown Kelowna",
    ],
    housingContext:
      "Expect a mix of newer subdivisions on the upper benches and established lakefront and lake-view streets closer to the water. West Kelowna often gives buyers more land and view for the dollar compared to equivalent Kelowna neighbourhoods.",
    image: "west-kelowna",
  },
  {
    slug: "penticton",
    name: "Penticton",
    tagline: "Between two lakes, at the heart of wine country",
    intro: [
      "Penticton occupies a narrow strip of land between Okanagan Lake and Skaha Lake, giving it a rare double-lake setting. It's smaller and slower-paced than Kelowna, with a downtown core built around the Okanagan Lake channel and beach.",
      "The Naramata Bench, just north of town, is one of the most concentrated wine-growing areas in the Okanagan and blends agricultural land with rural-residential properties.",
    ],
    lifestyle: [
      "Summers bring the Ironman Canada triathlon, the Peach Festival, and a steady flow of visitors to both lakes.",
      "Penticton's downtown and the Skaha Lake waterfront both draw a mix of retirees, young families, and seasonal residents.",
      "The Naramata Bench and Okanagan Falls to the south are the epicentre of Penticton-area wine touring.",
    ],
    suitedFor: [
      "Retirees and downsizers drawn to a smaller-town pace with two lakes to choose from",
      "Buyers interested in vineyard or acreage properties on the Naramata Bench",
      "Families wanting a quieter alternative to Kelowna without leaving the wine country lifestyle",
    ],
    thingsToDo: [
      "Skaha Lake and Okanagan Lake beaches",
      "Naramata Bench wine touring",
      "Kettle Valley Rail Trail cycling",
      "Penticton Peach Festival and Ironman Canada (summer events)",
    ],
    housingContext:
      "Penticton's core neighbourhoods (Wiltse, Main Bench, King's Park) tend toward established single-family homes, while the Naramata Bench offers acreage and vineyard-adjacent properties at a different price point entirely.",
    image: "penticton",
  },
  {
    slug: "vernon",
    name: "Vernon",
    tagline: "The North Okanagan, with three lakes and Silver Star nearby",
    intro: [
      "Vernon anchors the North Okanagan, bordered by Okanagan Lake, Kalamalka Lake, and Swan Lake. Kalamalka in particular is known for its striking turquoise water, and lakefront and lake-view property along its shore is some of the most sought-after in the region.",
      "Vernon is also the closest Okanagan city to Silver Star Mountain Resort, giving it a genuine four-season draw that pairs lake summers with ski-season winters.",
    ],
    lifestyle: [
      "Kalamalka Lake Provincial Park and its beaches are a defining feature of life in Vernon.",
      "Predator Ridge and Sparkling Hill anchor a golf-and-wellness resort community on Vernon's outskirts.",
      "Downtown Vernon has a smaller-town feel with a walkable core, farmers market, and local theatre.",
    ],
    suitedFor: [
      "Buyers who want both lake summers and mountain winters within a short drive",
      "Golf and resort-lifestyle buyers looking at Predator Ridge or similar communities",
      "Families and retirees who want more space for the price than Kelowna typically offers",
    ],
    thingsToDo: [
      "Kalamalka Lake Provincial Park",
      "Silver Star Mountain Resort skiing and mountain biking",
      "Predator Ridge golf and wellness community",
      "Downtown Vernon farmers market and Powerhouse Theatre",
    ],
    housingContext:
      "Vernon spans everything from in-town character homes to acreages and golf-resort properties on its outskirts, generally at a lower price point per square foot than comparable Kelowna listings.",
    image: "vernon",
  },
  {
    slug: "summerland",
    name: "Summerland",
    tagline: "A quieter lakeside village between Penticton and Peachland",
    intro: [
      "Summerland sits on the western shore of Okanagan Lake between Penticton and Peachland, and has deliberately kept a smaller-town character even as the rest of the valley has grown. It's an agricultural community first, known for orchards, vineyards, and a walkable heritage downtown.",
      "The pace here is noticeably slower than Kelowna or even Penticton, which is exactly the draw for a lot of buyers looking at Summerland.",
    ],
    lifestyle: [
      "Summerland's downtown core retains a heritage main-street feel, with independent shops and the Kettle Valley Steam Railway as a local landmark.",
      "Orchard and vineyard properties are more common here than in the larger Okanagan centres.",
      "Giant's Head Mountain and Sun-Oka Beach Provincial Park are both a short drive from most of town.",
    ],
    suitedFor: [
      "Buyers prioritizing a slower pace and small-town character over city amenities",
      "Those interested in orchard, vineyard, or hobby-farm properties",
      "Retirees and remote workers who don't need daily access to a larger city's amenities",
    ],
    thingsToDo: [
      "Kettle Valley Steam Railway",
      "Giant's Head Mountain trail and lookout",
      "Sun-Oka Beach Provincial Park",
      "Summerland's wineries along the Bottleneck Drive wine route",
    ],
    housingContext:
      "Summerland's housing mix leans toward single-family homes and acreages, with fewer condo and high-density options than Kelowna or Penticton — a reflection of its smaller size and agricultural zoning in much of the surrounding area.",
    image: "summerland",
  },
];

export function getAreaBySlug(slug: string): AreaGuide | undefined {
  return areas.find((area) => area.slug === slug);
}
