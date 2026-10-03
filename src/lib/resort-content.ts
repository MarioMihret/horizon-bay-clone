import lobby from "@/assets/horizon-lobby.jpg";
import pool from "@/assets/horizon-pool.jpg";
import spa from "@/assets/horizon-spa.jpg";
import suite from "@/assets/horizon-suite.jpg";

// The supplied Getva brief does not include approved image files yet. These
// existing concept images keep the layout useful until real hotel photography
// is supplied; the UI labels them as illustrative where a guest could infer
// a literal room or facility claim.
export const photos = { lobby, pool, spa, suite };

export const roomCatalog = [
  {
    name: "Single Room",
    category: "Rooms",
    label: "ROOM · CONFIRM OCCUPANCY",
    image: suite,
    description:
      "A practical, comfortable base for work trips and solo stays in Debre Birhan, with the essentials close at hand.",
    details: ["Free Wi-Fi", "Multi-channel TV", "Parking subject to availability"],
  },
  {
    name: "King Room",
    category: "Rooms",
    label: "ROOM · CONFIRM OCCUPANCY",
    image: lobby,
    description:
      "A room for a little more space and an easy city stay. Ask the reservations team about current room features and rates.",
    details: ["Free Wi-Fi", "TV / selected DSTV", "Breakfast details on request"],
  },
  {
    name: "Family Room",
    category: "Family",
    label: "FAMILY · CONFIRM OCCUPANCY",
    image: pool,
    description:
      "A flexible option for families or small groups. Availability, bed configuration, and current amenities are confirmed directly by the hotel.",
    details: ["Family-friendly option", "Free Wi-Fi", "Children’s play area nearby"],
  },
] as const;

export const diningExperiences = [
  {
    name: "Main Restaurant",
    label: "TRADITIONAL & MODERN",
    image: lobby,
    text: "A welcoming setting for everyday meals, from Ethiopian favourites to modern plates. Menus and service hours are confirmed on request.",
  },
  {
    name: "Traditional Restaurant",
    label: "LOCAL FLAVOUR",
    image: suite,
    text: "Discover a more distinctly Ethiopian dining atmosphere, with traditional food and coffee experiences subject to availability.",
  },
  {
    name: "Bars & Coffee",
    label: "TWO HOTEL BARS",
    image: pool,
    text: "Two reported hotel bars create easy places to meet, celebrate, or take a slower coffee. Ask the team what is open during your visit.",
  },
] as const;

export const wellnessOfferings = [
  {
    name: "Massage",
    detail:
      "Make time for a massage and ask the hotel team about current treatments and booking availability.",
  },
  {
    name: "Heat & recovery",
    detail:
      "Sauna, steam, and jacuzzi facilities are listed in the supplied hotel brief; confirm operating hours before visiting.",
  },
  {
    name: "Pool time",
    detail:
      "Use the pool and recreation areas as a simple way to reset between city plans and celebrations.",
  },
  {
    name: "Play & unwind",
    detail:
      "Billiards, a gaming house, and a children’s playground add options for different ages and energy levels.",
  },
] as const;

export const eventTypes = [
  {
    name: "Weddings & banquets",
    detail:
      "Plan a wedding, banquet, cocktail event, or annual dinner with a team that can shape the format around your guests.",
  },
  {
    name: "Corporate gatherings",
    detail:
      "Bring a meeting, team gathering, or private corporate event into a flexible hotel setting in Debre Birhan.",
  },
  {
    name: "Private celebrations",
    detail:
      "From family occasions to intimate dinners, ask about spaces, menus, packages, and current capacity.",
  },
] as const;

export const galleryItems = [
  { title: "A welcoming arrival", label: "THE STAY", image: lobby },
  { title: "A place to refresh", label: "RECREATION", image: pool },
  { title: "Time to reset", label: "WELLNESS", image: spa },
  { title: "Room to settle in", label: "ROOMS", image: suite },
  { title: "Gather around the table", label: "DINING", image: lobby },
  { title: "The highland city", label: "DEBRE BIRHAN", image: pool },
] as const;
