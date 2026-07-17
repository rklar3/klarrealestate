import type { ServiceAreaSlug } from "@/data/site";

export type PropertyType = "House" | "Condo" | "Townhome";

export type Listing = {
  slug: string;
  status: "Just Listed" | "Vineyard View" | "Waterfront" | "Downtown Condo" | "Family Home" | "Golf Community";
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  area: ServiceAreaSlug;
  areaLabel: string;
  type: PropertyType;
  summary: string;
  description: string[];
  features: string[];
  image: string;
};

// Seed/sample data only — not live inventory.
// TODO: connect CREA DDF® or IDX provider — requires Oakwyn brokerage sign-off
// and a data licensing agreement. When that's in place, replace the body of
// getListings()/getListingBySlug() below with calls to the feed, keeping the
// same Listing shape (or adapting callers) so the rest of the app is untouched.
const listings: Listing[] = [
  {
    slug: "512-lakeshore-rd-kelowna",
    status: "Just Listed",
    price: 1_275_000,
    beds: 4,
    baths: 3,
    sqft: 2850,
    address: "512 Lakeshore Rd, Kelowna, BC",
    area: "kelowna",
    areaLabel: "Kelowna",
    type: "House",
    summary: "A light-filled family home minutes from Okanagan Lake with room to grow.",
    description: [
      "Set on a quiet stretch of Lakeshore Road, this four-bedroom home pairs everyday livability with an easy walk to the beach.",
      "The main floor opens up around a renovated kitchen and a covered deck built for evening dinners. Upstairs, four bedrooms include a primary suite with a walk-in closet and lake-glimpse views.",
    ],
    features: [
      "Renovated kitchen with quartz counters",
      "Covered deck and fenced backyard",
      "Double attached garage",
      "Walking distance to Okanagan Lake",
    ],
    image: "lakeshore",
  },
  {
    slug: "104-naramata-bench-rd-penticton",
    status: "Vineyard View",
    price: 849_000,
    beds: 3,
    baths: 2,
    sqft: 1780,
    address: "104 Naramata Bench Rd, Penticton, BC",
    area: "penticton",
    areaLabel: "Penticton",
    type: "House",
    summary: "Rancher-style living on the Naramata Bench, surrounded by vineyards.",
    description: [
      "A single-level layout makes this Naramata Bench home easy to live in, with an open kitchen and living area that spills onto a patio facing the vines.",
      "Three bedrooms, an attached garage, and a low-maintenance lot make this a strong fit for downsizers or a vineyard-country second home.",
    ],
    features: [
      "Single-level rancher layout",
      "Patio with vineyard views",
      "Attached garage",
      "Minutes to Naramata village",
    ],
    image: "naramata",
  },
  {
    slug: "88-okanagan-lake-dr-west-kelowna",
    status: "Waterfront",
    price: 2_100_000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    address: "88 Okanagan Lake Dr, West Kelowna, BC",
    area: "west-kelowna",
    areaLabel: "West Kelowna",
    type: "House",
    summary: "A five-bedroom waterfront home with private lake access in West Kelowna.",
    description: [
      "This West Kelowna waterfront property spans over 4,200 sqft across three levels, with a walkout lower floor built for entertaining.",
      "Floor-to-ceiling windows frame the lake from the main living area, and a private dock puts the water steps from the back door.",
    ],
    features: [
      "Private dock and lake access",
      "Walkout lower level with wet bar",
      "Floor-to-ceiling lake-view windows",
      "Triple-car garage",
    ],
    image: "okanagan-lake",
  },
  {
    slug: "301-1290-water-st-kelowna",
    status: "Downtown Condo",
    price: 565_000,
    beds: 2,
    baths: 2,
    sqft: 1050,
    address: "301-1290 Water St, Kelowna, BC",
    area: "kelowna",
    areaLabel: "Kelowna",
    type: "Condo",
    summary: "A two-bedroom condo in the heart of downtown Kelowna, steps to the lake.",
    description: [
      "This third-floor unit sits in the middle of downtown Kelowna's restaurant and waterfront district, an easy walk to the beach, Knox Mountain trails, and the Cultural District.",
      "Two bedrooms and two full bathrooms make it workable as a primary residence, a lock-and-leave second home, or an investment unit.",
    ],
    features: [
      "In-suite laundry and storage",
      "Secure underground parking",
      "Walk to Kelowna waterfront and downtown core",
      "Building amenities: gym, rooftop patio",
    ],
    image: "water-st",
  },
  {
    slug: "47-wiltse-heights-penticton",
    status: "Family Home",
    price: 739_000,
    beds: 3,
    baths: 2,
    sqft: 1920,
    address: "47 Wiltse Heights, Penticton, BC",
    area: "penticton",
    areaLabel: "Penticton",
    type: "House",
    summary: "A well-kept family home in Penticton's Wiltse neighbourhood, close to schools.",
    description: [
      "Tucked into the Wiltse Heights neighbourhood, this three-bedroom home is a short walk to elementary and middle schools and a quick drive to both Okanagan and Skaha lakes.",
      "A fenced yard and attached garage round out a layout that's worked well for young families in this pocket of Penticton for years.",
    ],
    features: [
      "Fenced yard, ideal for kids or pets",
      "Attached garage with extra storage",
      "Close to Wiltse Elementary and local parks",
      "Central to both Okanagan and Skaha lakes",
    ],
    image: "wiltse",
  },
  {
    slug: "215-predator-ridge-dr-vernon",
    status: "Golf Community",
    price: 1_450_000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    address: "215 Predator Ridge Dr, Vernon, BC",
    area: "vernon",
    areaLabel: "Vernon",
    type: "House",
    summary: "A golf-community home in Vernon with resort-style amenities year-round.",
    description: [
      "Set within the Predator Ridge community, this four-bedroom home backs onto green space with views across the course.",
      "Residents get access to two championship golf courses, a fitness and wellness centre, tennis, and walking trails — a lifestyle purchase as much as a home.",
    ],
    features: [
      "Backs onto golf course green space",
      "Access to Predator Ridge amenities (golf, fitness, trails)",
      "Open-concept great room with vaulted ceilings",
      "Double garage plus workshop space",
    ],
    image: "predator-ridge",
  },
];

export function getListings(): Listing[] {
  return listings;
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((listing) => listing.slug === slug);
}

export function filterListings(params: {
  area?: string;
  maxPrice?: number;
  beds?: number;
  type?: string;
}): Listing[] {
  return listings.filter((listing) => {
    if (params.area && listing.area !== params.area) return false;
    if (params.maxPrice && listing.price > params.maxPrice) return false;
    if (params.beds && listing.beds < params.beds) return false;
    if (params.type && listing.type !== params.type) return false;
    return true;
  });
}
