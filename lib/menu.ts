export type DietaryTag = 'gf' | 'vegan' | 'vegetarian' | 'spicy' | 'nut-free' | 'dairy-free';

export const DIETARY_LABELS: Record<DietaryTag, string> = {
  'gf':          'Gluten-Free',
  'vegan':       'Vegan',
  'vegetarian':  'Vegetarian',
  'spicy':       'Spicy',
  'nut-free':    'Nut-Free',
  'dairy-free':  'Dairy-Free',
};

export const DIETARY_COLOR: Record<DietaryTag, string> = {
  'gf':          '#8BAF6A',
  'vegan':       '#6BAF8A',
  'vegetarian':  '#7AAF70',
  'spicy':       '#C45D2A',
  'nut-free':    '#4F98A3',
  'dairy-free':  '#8B9FAF',
};

export interface MenuItem {
  id:          string;
  vendorSlug:  string;
  vendorName:  string;
  name:        string;
  description: string;
  price:       string;
  dietary:     DietaryTag[];
  category:    string;
  featured:    boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // ── Cider & Spice Bar ───────────────────────────────────────
  { id: 'cs-01', vendorSlug: 'cider-spice-bar', vendorName: 'Cider & Spice Bar', name: 'Rotating Tasting Flight', description: 'Four 3-oz pours from the seasonal NM tap list. Selection changes weekly.', price: '$14', dietary: ['gf', 'vegan'], category: 'Drinks', featured: true },
  { id: 'cs-02', vendorSlug: 'cider-spice-bar', vendorName: 'Cider & Spice Bar', name: 'Hatch Chile & Honey Cider', description: 'Off-dry NM craft cider with roasted Hatch chile finish and wildflower honey nose.', price: '$9', dietary: ['gf', 'vegan'], category: 'Drinks', featured: true },
  { id: 'cs-03', vendorSlug: 'cider-spice-bar', vendorName: 'Cider & Spice Bar', name: 'Barrel-Aged Heritage Pour', description: 'Single-origin heritage apple cider aged in NM red wine barrels. Limited pours nightly.', price: '$12', dietary: ['gf', 'vegan'], category: 'Drinks', featured: false },
  { id: 'cs-04', vendorSlug: 'cider-spice-bar', vendorName: 'Cider & Spice Bar', name: 'Charcuterie Pairing Board', description: 'Rotating selection of cured meats, aged cheeses, and seasonal preserves. Pairs with any tap.', price: '$18', dietary: ['gf', 'nut-free'], category: 'Small Plates', featured: true },
  { id: 'cs-05', vendorSlug: 'cider-spice-bar', vendorName: 'Cider & Spice Bar', name: 'Hopped Dry Cider', description: 'Bone-dry NM cider dry-hopped with Citra and Mosaic. Crisp, bitter finish.', price: '$9', dietary: ['gf', 'vegan'], category: 'Drinks', featured: false },

  // ── Stall 07 — Mexican Street Food ───────────────────────────
  { id: 'm7-01', vendorSlug: 'stall-07', vendorName: 'Stall 07 — Street Food', name: 'Birria Taco (3pc)', description: 'Slow-braised beef birria in hand-pressed corn tortillas with consommé for dipping. Topped with onion, cilantro, lime.', price: '$13', dietary: ['gf', 'dairy-free', 'spicy'], category: 'Tacos', featured: true },
  { id: 'm7-02', vendorSlug: 'stall-07', vendorName: 'Stall 07 — Street Food', name: 'Elote en Vaso', description: 'Roasted corn cup with cotija, lime crema, chile powder, and tajin.', price: '$7', dietary: ['vegetarian', 'gf'], category: 'Sides', featured: true },
  { id: 'm7-03', vendorSlug: 'stall-07', vendorName: 'Stall 07 — Street Food', name: 'Al Pastor Taco (3pc)', description: 'Achiote-marinated pork on a vertical spit, served with pineapple, white onion, and cilantro.', price: '$12', dietary: ['gf', 'dairy-free'], category: 'Tacos', featured: false },
  { id: 'm7-04', vendorSlug: 'stall-07', vendorName: 'Stall 07 — Street Food', name: 'Mushroom Taco (3pc)', description: 'Sautéed king oyster mushroom al pastor style. Fully plant-forward.', price: '$11', dietary: ['vegan', 'gf', 'dairy-free'], category: 'Tacos', featured: false },
  { id: 'm7-05', vendorSlug: 'stall-07', vendorName: 'Stall 07 — Street Food', name: 'Agua Fresca', description: 'Rotating seasonal fruit agua fresca. Hibiscus, tamarind, or horchata.', price: '$4', dietary: ['vegan', 'gf', 'dairy-free', 'nut-free'], category: 'Drinks', featured: false },

  // ── Stall 04 — Mediterranean ───────────────────────────────
  { id: 'm4-01', vendorSlug: 'stall-04', vendorName: 'Stall 04 — Mediterranean', name: 'Shawarma Plate', description: 'Slow-roasted chicken shawarma over saffron rice with garlic toum, pickled turnip, and warm pita.', price: '$15', dietary: ['dairy-free', 'nut-free'], category: 'Plates', featured: true },
  { id: 'm4-02', vendorSlug: 'stall-04', vendorName: 'Stall 04 — Mediterranean', name: 'Falafel Bowl', description: 'House-fried falafel over tabbouleh, hummus, and cucumber-tomato salad. Topped with tahini.', price: '$13', dietary: ['vegan', 'nut-free', 'dairy-free'], category: 'Bowls', featured: true },
  { id: 'm4-03', vendorSlug: 'stall-04', vendorName: 'Stall 04 — Mediterranean', name: 'Lamb Kofta Wrap', description: 'Spiced ground lamb kofta in charred flatbread with harissa yogurt, arugula, and pickled onion.', price: '$14', dietary: ['nut-free'], category: 'Wraps', featured: false },
  { id: 'm4-04', vendorSlug: 'stall-04', vendorName: 'Stall 04 — Mediterranean', name: 'Mezze Sampler', description: 'Hummus, baba ganoush, labneh, dolmas, olives, and warm pita. Serves two.', price: '$16', dietary: ['vegetarian', 'nut-free'], category: 'Small Plates', featured: false },
  { id: 'm4-05', vendorSlug: 'stall-04', vendorName: 'Stall 04 — Mediterranean', name: 'Lentil Soup', description: 'Red lentil soup with cumin, lemon, and fresh herb oil. Served with pita.', price: '$8', dietary: ['vegan', 'gf', 'dairy-free', 'nut-free'], category: 'Soups', featured: false },

  // ── Stall 01 — Vietnamese Bowls ─────────────────────────────
  { id: 'm1-01', vendorSlug: 'stall-01', vendorName: 'Stall 01 — Vietnamese', name: 'Phở Bo', description: 'Slow-simmered beef bone broth with rice noodles, rare beef, brisket, fresh herbs, and bean sprouts.', price: '$14', dietary: ['gf', 'dairy-free', 'nut-free'], category: 'Noodles', featured: true },
  { id: 'm1-02', vendorSlug: 'stall-01', vendorName: 'Stall 01 — Vietnamese', name: 'Bún Bò Huế', description: 'Spicy lemongrass beef noodle soup with pork knuckle, rice vermicelli, and shrimp paste broth.', price: '$15', dietary: ['gf', 'dairy-free', 'spicy'], category: 'Noodles', featured: false },
  { id: 'm1-03', vendorSlug: 'stall-01', vendorName: 'Stall 01 — Vietnamese', name: 'Gỏi Cuốn (4pc)', description: 'Fresh rice paper rolls with shrimp, pork, rice vermicelli, lettuce, and mint. Served with hoisin-peanut sauce.', price: '$10', dietary: ['gf', 'dairy-free'], category: 'Starters', featured: true },
  { id: 'm1-04', vendorSlug: 'stall-01', vendorName: 'Stall 01 — Vietnamese', name: 'Lemongrass Tofu Bowl', description: 'Wok-tossed lemongrass tofu over jasmine rice with pickled daikon, scallion oil, and chili crisp.', price: '$12', dietary: ['vegan', 'gf', 'dairy-free'], category: 'Bowls', featured: false },
  { id: 'm1-05', vendorSlug: 'stall-01', vendorName: 'Stall 01 — Vietnamese', name: 'Cà Phê Sữa Đá', description: 'Vietnamese iced coffee with sweetened condensed milk over ice.', price: '$5', dietary: ['vegetarian', 'gf', 'nut-free'], category: 'Drinks', featured: false },

  // ── Stall 03 — Desserts & Specialty Drinks ────────────────────
  { id: 'm3-01', vendorSlug: 'stall-03', vendorName: 'Stall 03 — Desserts', name: 'Churro Waffle', description: 'Crisp churro-battered waffle with dulce de leche drizzle, fresh strawberries, and crema.', price: '$10', dietary: ['vegetarian', 'nut-free'], category: 'Desserts', featured: true },
  { id: 'm3-02', vendorSlug: 'stall-03', vendorName: 'Stall 03 — Desserts', name: 'Horchata Soft Serve', description: 'House-made horchata ice cream in a waffle cone. Cinnamon-rice base, topped with tajin dust.', price: '$6', dietary: ['vegetarian', 'gf', 'nut-free'], category: 'Desserts', featured: true },
  { id: 'm3-03', vendorSlug: 'stall-03', vendorName: 'Stall 03 — Desserts', name: 'Tres Leches Slice', description: 'Classic tres leches soaked sponge with fresh whipped cream and seasonal berry compote.', price: '$7', dietary: ['vegetarian', 'nut-free'], category: 'Desserts', featured: false },
  { id: 'm3-04', vendorSlug: 'stall-03', vendorName: 'Stall 03 — Desserts', name: 'Hibiscus Lemonade', description: 'House-brewed hibiscus concentrate with fresh lemon, cane sugar, and sparkling water.', price: '$5', dietary: ['vegan', 'gf', 'dairy-free', 'nut-free'], category: 'Drinks', featured: false },
  { id: 'm3-05', vendorSlug: 'stall-03', vendorName: 'Stall 03 — Desserts', name: 'Conchas & Coffee', description: 'Two fresh pan dulce conchas paired with a café de olla — cinnamon-spiced Mexican drip coffee.', price: '$7', dietary: ['vegetarian', 'nut-free'], category: 'Pastries', featured: false },

  // ── Stall 06 — Charcuterie & Small Plates ────────────────────
  { id: 'm6-01', vendorSlug: 'stall-06', vendorName: 'Stall 06 — Small Plates', name: 'Chef\'s Charcuterie Board', description: 'Rotating selection of 3 cured meats, 2 aged cheeses, seasonal jam, honeycomb, and grilled bread.', price: '$22', dietary: ['nut-free'], category: 'Boards', featured: true },
  { id: 'm6-02', vendorSlug: 'stall-06', vendorName: 'Stall 06 — Small Plates', name: 'Whipped Ricotta Crostini', description: 'House whipped ricotta on toasted sourdough with NM wildflower honey, walnuts, and fresh thyme.', price: '$10', dietary: ['vegetarian'], category: 'Small Plates', featured: false },
  { id: 'm6-03', vendorSlug: 'stall-06', vendorName: 'Stall 06 — Small Plates', name: 'Marinated Olives', description: 'Castelvetrano and Kalamata olives in citrus-herb oil with chili flake and roasted garlic.', price: '$7', dietary: ['vegan', 'gf', 'dairy-free', 'nut-free'], category: 'Small Plates', featured: false },
  { id: 'm6-04', vendorSlug: 'stall-06', vendorName: 'Stall 06 — Small Plates', name: 'Smoked Salmon Toast', description: 'Cold-smoked salmon on dark rye with cream cheese, pickled shallot, capers, and dill.', price: '$13', dietary: ['nut-free'], category: 'Small Plates', featured: true },
  { id: 'm6-05', vendorSlug: 'stall-06', vendorName: 'Stall 06 — Small Plates', name: 'Seasonal Veg Board', description: 'Market vegetables with whipped hummus, herb vinaigrette, and grilled pita.', price: '$14', dietary: ['vegan', 'dairy-free', 'nut-free'], category: 'Boards', featured: false },
];

export function getAllItems(): MenuItem[] {
  return MENU_ITEMS;
}

export function getItemsByVendor(vendorSlug: string): MenuItem[] {
  return MENU_ITEMS.filter(i => i.vendorSlug === vendorSlug);
}

export function getItemsByDiet(tag: DietaryTag): MenuItem[] {
  return MENU_ITEMS.filter(i => i.dietary.includes(tag));
}

export function getFeaturedItems(): MenuItem[] {
  return MENU_ITEMS.filter(i => i.featured);
}

export function getVendorSlugs(): string[] {
  return [...new Set(MENU_ITEMS.map(i => i.vendorSlug))];
}

export function getVendorNames(): { slug: string; name: string }[] {
  const seen = new Set<string>();
  return MENU_ITEMS
    .filter(i => { if (seen.has(i.vendorSlug)) return false; seen.add(i.vendorSlug); return true; })
    .map(i => ({ slug: i.vendorSlug, name: i.vendorName }));
}
