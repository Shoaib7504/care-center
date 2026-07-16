// Shared static service definitions — used by both the service detail pages
// and the booking flow (no database needed for these hardcoded offerings).
// Images are imported at the usage sites to avoid bundling them here.

export const SERVICES = [
  {
    id: "babysitting",
    category: "child",
    title: "Babysitting",
    tagline: "Safe, nurturing care for your little ones",
    description:
      "Experienced babysitters who create a warm, stimulating environment for children of all ages — from newborns to school-age kids.",
    pricePerHour: 18,
    features: [
      "Age-appropriate activities & play",
      "Meal preparation for children",
      "Bedtime routine assistance",
      "Light housekeeping",
      "Emergency first-aid certified",
      "Flexible scheduling",
    ],
    caregiver: {
      name: "Sarah Mitchell",
      role: "Certified Childcare Specialist · 6 yrs exp.",
      rating: 4.9,
      reviews: 142,
    },
  },
  {
    id: "elderly-care",
    category: "senior",
    title: "Elderly Care",
    tagline: "Compassionate support for seniors",
    description:
      "Dedicated caretakers who assist with daily activities, companionship, mobility support, and medication reminders.",
    pricePerHour: 22,
    features: [
      "Daily activity assistance",
      "Medication reminders",
      "Mobility & transfer support",
      "Companionship & social engagement",
      "Light meal preparation",
      "Transportation to appointments",
    ],
    caregiver: {
      name: "James Okafor",
      role: "Senior Care Specialist · 9 yrs exp.",
      rating: 4.8,
      reviews: 98,
    },
  },
  {
    id: "home-nursing",
    category: "medical",
    title: "Home Nursing",
    tagline: "Clinical care in the comfort of home",
    description:
      "Certified nurses providing post-operative care, wound management, IV therapy, and chronic disease monitoring at home.",
    pricePerHour: 35,
    features: [
      "Post-operative wound care",
      "IV therapy administration",
      "Chronic disease monitoring",
      "Vital signs tracking",
      "Medication management",
      "Coordination with physicians",
    ],
    caregiver: {
      name: "Dr. Priya Nair",
      role: "Registered Nurse · 12 yrs exp.",
      rating: 5.0,
      reviews: 217,
    },
  },
];

/** Returns a single service by its slug id, or null if not found. */
export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.id === slug) ?? null;
}
