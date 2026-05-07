// Default placeholder gallery — used when admin hasn't uploaded any images yet.
// Photographer can replace these via the /admin upload panel.
export const PLACEHOLDER_PHOTOS = [
  {
    id: "ph-hero-1",
    title: "Silver Drophead, 11:42 PM",
    category: "automotive",
    image_data:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    description: "Hamilton, ON — late-night roll out.",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-2",
    title: "M-Power, Rain Slick",
    category: "automotive",
    image_data:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-3",
    title: "Lush",
    category: "portrait",
    image_data:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-4",
    title: "Steel & Light",
    category: "architecture",
    image_data:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-5",
    title: "Idle on Catharine",
    category: "motorcycle",
    image_data:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-6",
    title: "Quiet Confidence",
    category: "portrait",
    image_data:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-7",
    title: "Concrete Cathedral",
    category: "architecture",
    image_data:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-8",
    title: "Cafe Racer",
    category: "motorcycle",
    image_data:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80",
    created_at: new Date().toISOString(),
  },
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1770608014330-7de6ce86c69d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodHxlbnwwfHx8fDE3NzgxOTM2MDB8MA&ixlib=rb-4.1.0&q=85";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1100&q=80";

export const CATEGORIES = [
  { key: "all", label: "All Work" },
  { key: "automotive", label: "Automotive" },
  { key: "motorcycle", label: "Motorcycles" },
  { key: "architecture", label: "Architecture" },
  { key: "portrait", label: "Portraits" },
];
