// Default placeholder gallery — used when admin hasn't uploaded any images yet.
// Photographer can replace these via the /admin upload panel.
export const PLACEHOLDER_PHOTOS = [
  {
    id: "ph-hero-1",
    title: "Silver Drophead, 11:42 PM",
    category: "automotive",
    image_data:
      "https://images.unsplash.com/photo-1770608014330-7de6ce86c69d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodHxlbnwwfHx8fDE3NzgxOTM2MDB8MA&ixlib=rb-4.1.0&q=85",
    description: "Hamilton, ON — late-night roll out.",
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-2",
    title: "M-Power, Rain Slick",
    category: "automotive",
    image_data:
      "https://images.unsplash.com/photo-1753792707171-162cc17211ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodHxlbnwwfHx8fDE3NzgxOTM2MDB8MA&ixlib=rb-4.1.0&q=85",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-3",
    title: "Lush",
    category: "portrait",
    image_data:
      "https://images.pexels.com/photos/33135872/pexels-photo-33135872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-4",
    title: "Steel & Light",
    category: "architecture",
    image_data:
      "https://images.unsplash.com/photo-1689592609292-69e2344f0ff1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYXJjaGl0ZWN0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzc4MTkzNjAwfDA&ixlib=rb-4.1.0&q=85",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-5",
    title: "Idle on Catharine",
    category: "motorcycle",
    image_data:
      "https://images.unsplash.com/photo-1759248762794-71a284210a55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxjaW5lbWF0aWMlMjBtb3RvcmN5Y2xlJTIwcGhvdG9ncmFwaHklMjBkYXJrfGVufDB8fHx8MTc3ODE5MzYxOXww&ixlib=rb-4.1.0&q=85",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-6",
    title: "Quiet Confidence",
    category: "portrait",
    image_data:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-7",
    title: "Concrete Cathedral",
    category: "architecture",
    image_data:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "ph-8",
    title: "Cafe Racer",
    category: "motorcycle",
    image_data:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
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
