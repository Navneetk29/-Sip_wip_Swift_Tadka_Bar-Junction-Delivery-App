export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory?: string; // quarter | half | full
  size: string;
  price: number;
  mrp: number;
  abv?: string;
  rating: number;
  reviews: number;
  image: string;
  ageRestricted: boolean;
  vendor: string;
  vendorId: string;
  tag?: string;
  description?: string;
  inStock: boolean;
  discount?: number;
  origin?: string;
}

export const categories = [
  { slug: "wine",        label: "Wine",         emoji: "🍷", color: "from-wine to-wine-bright" },
  { slug: "beer",        label: "Beer",         emoji: "🍺", color: "from-amber-dim to-amber" },
  { slug: "whiskey",     label: "Whiskey",      emoji: "🥃", color: "from-amber to-amber-light" },
  { slug: "vodka",       label: "Vodka",        emoji: "🍸", color: "from-cask to-smoke-dim" },
  { slug: "rum",         label: "Rum",          emoji: "🍹", color: "from-wine-bright to-ruby" },
  { slug: "gin",         label: "Gin",          emoji: "🌿", color: "from-emerald to-emerald-bright" },
  { slug: "brandy",      label: "Brandy",       emoji: "🍶", color: "from-amber-dim to-wine" },
  { slug: "tequila",     label: "Tequila",      emoji: "🥂", color: "from-gold to-amber-light" },
  { slug: "champagne",   label: "Champagne",    emoji: "🍾", color: "from-gold to-ivory-dim" },
  { slug: "desi",        label: "Desi Liquor",  emoji: "🥃", color: "from-amber-dim to-amber" },
  { slug: "quarter",     label: "Quarter Btl",  emoji: "🫙", color: "from-smoke-dim to-smoke" },
  { slug: "half",        label: "Half Bottle",  emoji: "🫗", color: "from-smoke-dim to-smoke" },
  { slug: "full",        label: "Full Bottle",  emoji: "🍾", color: "from-gold to-amber" },
  { slug: "mixers",      label: "Mixers",       emoji: "🧉", color: "from-info to-emerald-bright" },
  { slug: "ice",         label: "Ice",          emoji: "🧊", color: "from-info to-smoke" },
  { slug: "cigarettes",  label: "Cigarettes",   emoji: "🚬", color: "from-smoke-dim to-smoke" },
  { slug: "chakhna",     label: "Chakhna",      emoji: "🥜", color: "from-amber-dim to-amber" },
  { slug: "snacks",      label: "Snacks",       emoji: "🍟", color: "from-warning to-amber-light" },
  { slug: "restaurants", label: "Restaurants",  emoji: "🍽️", color: "from-wine-bright to-ruby" },
] as const;

export const products: Product[] = [
  // WINE
  { id: "p1",  name: "Sula Shiraz Rosé",             brand: "Sula Vineyards",      category: "wine",     size: "750ml", price: 799,  mrp: 899,  abv: "12.5%", rating: 4.4, reviews: 312, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=600", ageRestricted: true,  vendor: "Vinoteca Wine Cellar",  vendorId: "v1", tag: "Bestseller", inStock: true,  origin: "Nashik, India",   discount: 11 },
  { id: "p2",  name: "Jacob's Creek Chardonnay",      brand: "Jacob's Creek",       category: "wine",     size: "750ml", price: 1250, mrp: 1400, abv: "13%",   rating: 4.3, reviews: 198, image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600", ageRestricted: true,  vendor: "Vinoteca Wine Cellar",  vendorId: "v1", tag: "Imported",   inStock: true,  origin: "Australia",       discount: 11 },
  { id: "p3",  name: "Fratelli Sette",                brand: "Fratelli Wines",      category: "wine",     size: "750ml", price: 1850, mrp: 2100, abv: "14%",   rating: 4.6, reviews: 421, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600", ageRestricted: true,  vendor: "Vinoteca Wine Cellar",  vendorId: "v1", tag: "Premium",    inStock: true,  origin: "Akluj, India",    discount: 12 },

  // BEER
  { id: "p4",  name: "Kingfisher Ultra",               brand: "Kingfisher",          category: "beer",     size: "650ml x6", price: 720, mrp: 780, abv: "5%",   rating: 4.2, reviews: 856, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600", ageRestricted: true,  vendor: "QuickSip Beer Mart",    vendorId: "v2", inStock: true,  origin: "India",           discount: 8  },
  { id: "p5",  name: "Heineken Lager",                  brand: "Heineken",            category: "beer",     size: "500ml x4", price: 560, mrp: 620, abv: "5%",   rating: 4.4, reviews: 621, image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=600", ageRestricted: true,  vendor: "QuickSip Beer Mart",    vendorId: "v2", tag: "Imported", inStock: true,  origin: "Netherlands",     discount: 10 },
  { id: "p6",  name: "Bira 91 White",                   brand: "Bira 91",             category: "beer",     size: "330ml x6", price: 480, mrp: 540, abv: "4.7%", rating: 4.1, reviews: 388, image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600", ageRestricted: true,  vendor: "QuickSip Beer Mart",    vendorId: "v2", inStock: true,  origin: "India",           discount: 11 },
  { id: "p7",  name: "Corona Extra",                    brand: "Corona",              category: "beer",     size: "330ml x6", price: 780, mrp: 840, abv: "4.5%", rating: 4.5, reviews: 543, image: "https://images.unsplash.com/photo-1516901121982-4ba6c99a6ee7?q=80&w=600", ageRestricted: true,  vendor: "QuickSip Beer Mart",    vendorId: "v2", tag: "Imported", inStock: true,  origin: "Mexico",          discount: 7  },

  // WHISKEY
  { id: "p8",  name: "Johnnie Walker Black Label",      brand: "Johnnie Walker",      category: "whiskey",  subCategory: "full", size: "750ml", price: 3499, mrp: 3799, abv: "40%", rating: 4.7, reviews: 924, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", tag: "Premium",  inStock: true,  origin: "Scotland", discount: 8  },
  { id: "p9",  name: "Royal Stag Deluxe",               brand: "Royal Stag",          category: "whiskey",  subCategory: "full", size: "750ml", price: 650,  mrp: 720,  abv: "42.8%", rating: 4.0, reviews: 1243, image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", tag: "Bestseller", inStock: true, origin: "India", discount: 10 },
  { id: "p10", name: "Jameson Irish Whiskey",           brand: "Jameson",             category: "whiskey",  subCategory: "full", size: "750ml", price: 2650, mrp: 2900, abv: "40%", rating: 4.6, reviews: 612, image: "https://images.unsplash.com/photo-1583256905039-357af41d0730?q=80&w=600", ageRestricted: true, vendor: "The Amber Room",  vendorId: "v3", tag: "Imported", inStock: true,  origin: "Ireland",  discount: 9  },
  { id: "p11", name: "Blenders Pride Reserve",          brand: "Blenders Pride",      category: "whiskey",  subCategory: "full", size: "750ml", price: 1150, mrp: 1280, abv: "42.8%", rating: 4.3, reviews: 889, image: "https://images.unsplash.com/photo-1602084993000-8b745cebc42e?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 10 },
  { id: "p12", name: "Royal Stag Quarter",              brand: "Royal Stag",          category: "quarter",  subCategory: "quarter", size: "180ml", price: 160, mrp: 180, abv: "42.8%", rating: 4.0, reviews: 322, image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 11 },
  { id: "p13", name: "Officer's Choice Half Bottle",   brand: "Officer's Choice",    category: "half",     subCategory: "half",    size: "375ml", price: 280, mrp: 310, abv: "42.8%", rating: 3.9, reviews: 544, image: "https://images.unsplash.com/photo-1602084993000-8b745cebc42e?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 10 },

  // VODKA
  { id: "p14", name: "Absolut Vodka Original",          brand: "Absolut",             category: "vodka",    size: "750ml", price: 1450, mrp: 1600, abv: "40%", rating: 4.3, reviews: 501, image: "https://images.unsplash.com/photo-1622957461299-baa843c9dc71?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", tag: "Imported", inStock: true,  origin: "Sweden",   discount: 9  },
  { id: "p15", name: "Magic Moments Dazzle Vodka",      brand: "Magic Moments",       category: "vodka",    size: "750ml", price: 750,  mrp: 840,  abv: "42.8%", rating: 4.1, reviews: 387, image: "https://images.unsplash.com/photo-1559333086-b0a56225a93c?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",   discount: 11 },
  { id: "p16", name: "Smirnoff No. 21 Vodka",           brand: "Smirnoff",            category: "vodka",    size: "750ml", price: 1150, mrp: 1280, abv: "40%", rating: 4.2, reviews: 445, image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", inStock: true,  origin: "UK",      discount: 10 },

  // RUM
  { id: "p17", name: "Old Monk Rum",                    brand: "Old Monk",            category: "rum",      size: "750ml", price: 550,  mrp: 620,  abv: "42.8%", rating: 4.6, reviews: 1832, image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", tag: "Classic", inStock: true,  origin: "India",    discount: 11 },
  { id: "p18", name: "Bacardi Superior White Rum",      brand: "Bacardi",             category: "rum",      size: "750ml", price: 1350, mrp: 1480, abv: "40%",   rating: 4.4, reviews: 612, image: "https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=600", ageRestricted: true, vendor: "The Amber Room",  vendorId: "v3", tag: "Imported", inStock: true,  origin: "Puerto Rico", discount: 9  },

  // GIN
  { id: "p19", name: "Bombay Sapphire Gin",             brand: "Bombay Sapphire",     category: "gin",      size: "750ml", price: 2100, mrp: 2300, abv: "40%", rating: 4.5, reviews: 487, image: "https://images.unsplash.com/photo-1613063070380-4d3a86e5c1de?q=80&w=600", ageRestricted: true, vendor: "Vinoteca Wine Cellar", vendorId: "v1", tag: "Premium", inStock: true,  origin: "UK", discount: 9  },
  { id: "p20", name: "Greater Than Gin",                brand: "Greater Than",        category: "gin",      size: "750ml", price: 1850, mrp: 2050, abv: "42.8%", rating: 4.7, reviews: 298, image: "https://images.unsplash.com/photo-1583069816691-ebf9fe69f2a8?q=80&w=600", ageRestricted: true, vendor: "Vinoteca Wine Cellar", vendorId: "v1", tag: "Craft",   inStock: true,  origin: "India", discount: 10 },

  // BRANDY
  { id: "p21", name: "Mansion House Brandy",            brand: "Mansion House",       category: "brandy",   size: "375ml", price: 380,  mrp: 420,  abv: "42.8%", rating: 4.0, reviews: 211, image: "https://images.unsplash.com/photo-1560508601-15f4ae03fea9?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 10 },
  { id: "p22", name: "Honey Bee Brandy",                brand: "Honey Bee",           category: "brandy",   size: "750ml", price: 620,  mrp: 700,  abv: "42.8%", rating: 4.1, reviews: 334, image: "https://images.unsplash.com/photo-1560508601-15f4ae03fea9?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", tag: "Classic",  inStock: true,  origin: "India",    discount: 11 },

  // TEQUILA
  { id: "p23", name: "Jose Cuervo Gold Tequila",        brand: "Jose Cuervo",         category: "tequila",  size: "750ml", price: 2450, mrp: 2700, abv: "40%", rating: 4.4, reviews: 321, image: "https://images.unsplash.com/photo-1545992996-1b4b5d22d11d?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", tag: "Premium", inStock: true,  origin: "Mexico",   discount: 9  },

  // CHAMPAGNE
  { id: "p24", name: "Moët & Chandon Brut Impérial",   brand: "Moët & Chandon",      category: "champagne", size: "750ml", price: 5200, mrp: 5600, abv: "12%", rating: 4.8, reviews: 892, image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", tag: "Luxury",  inStock: true,  origin: "France",   discount: 7  },
  { id: "p25", name: "Sula Brut Sparkling Wine",        brand: "Sula Vineyards",      category: "champagne", size: "750ml", price: 1250, mrp: 1400, abv: "12%", rating: 4.3, reviews: 287, image: "https://images.unsplash.com/photo-1570526374681-1e6b3f3a0165?q=80&w=600", ageRestricted: true, vendor: "Vinoteca Wine Cellar", vendorId: "v1", inStock: true,  origin: "India",  discount: 11 },

  // DESI LIQUOR
  { id: "p26", name: "Haywards 5000 Strong Beer",       brand: "Haywards",            category: "desi",     size: "650ml", price: 80,   mrp: 90,   abv: "7%",    rating: 3.8, reviews: 622, image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 11 },
  { id: "p27", name: "Bagpiper Whisky",                  brand: "Bagpiper",            category: "desi",     size: "750ml", price: 480,  mrp: 540,  abv: "42.8%", rating: 3.9, reviews: 776, image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=600", ageRestricted: true, vendor: "Desi Daru Store", vendorId: "v4", inStock: true,  origin: "India",    discount: 11 },

  // MIXERS
  { id: "p28", name: "Schweppes Soda Mixer Pack",       brand: "Schweppes",           category: "mixers",   size: "300ml x4", price: 180, mrp: 200, rating: 4.0, reviews: 132, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true,  origin: "India",    discount: 10 },
  { id: "p29", name: "Appy Fizz Apple Drink",           brand: "Parle Agro",          category: "mixers",   size: "250ml x6", price: 120, mrp: 140, rating: 4.2, reviews: 243, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true,  origin: "India",    discount: 14 },
  { id: "p30", name: "Red Bull Energy Drink",           brand: "Red Bull",            category: "mixers",   size: "250ml x4", price: 380, mrp: 420, rating: 4.5, reviews: 567, image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", tag: "Popular", inStock: true, origin: "Austria", discount: 10 },

  // ICE
  { id: "p31", name: "Party Ice Cubes",                 brand: "SipSwift Ice",        category: "ice",      size: "2kg bag", price: 60,  mrp: 70,   rating: 4.3, reviews: 89,  image: "https://images.unsplash.com/photo-1585513553927-f3f0d9c2be5e?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true,  origin: "Local",     discount: 14 },

  // CHAKHNA / SNACKS
  { id: "p32", name: "Masala Peanuts",                  brand: "Haldiram's",          category: "chakhna",  size: "200g",    price: 90,  mrp: 100,  rating: 4.1, reviews: 421, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true },
  { id: "p33", name: "Bhujia Sev",                      brand: "Haldiram's",          category: "chakhna",  size: "400g",    price: 180, mrp: 200,  rating: 4.3, reviews: 312, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", tag: "Bestseller", inStock: true, discount: 10 },
  { id: "p34", name: "Classic Nachos & Salsa",          brand: "SipSwift Kitchen",    category: "snacks",   size: "1 box",   price: 220, mrp: 250,  rating: 4.3, reviews: 198, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600", ageRestricted: false, vendor: "The Grill House",    vendorId: "v5", inStock: true, discount: 12 },
  { id: "p35", name: "Lays American Style Cream & Onion", brand: "Lays",             category: "snacks",   size: "100g x4", price: 140, mrp: 160,  rating: 4.4, reviews: 532, image: "https://images.unsplash.com/photo-1527459222053-7e2f0e87e3c1?q=80&w=600", ageRestricted: false, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true, discount: 13 },
  { id: "p36", name: "Pepperoni Pizza Rolls",           brand: "SipSwift Kitchen",    category: "snacks",   size: "6 pcs",   price: 180, mrp: 200,  rating: 4.2, reviews: 143, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600", ageRestricted: false, vendor: "The Grill House",    vendorId: "v5", inStock: true, discount: 10 },

  // CIGARETTES
  { id: "p37", name: "Classic Milds (King Size)",       brand: "ITC",                 category: "cigarettes", size: "10 sticks", price: 140, mrp: 140, rating: 4.0, reviews: 234, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600", ageRestricted: true, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true },
  { id: "p38", name: "Gold Flake Kings",                brand: "ITC",                 category: "cigarettes", size: "10 sticks", price: 130, mrp: 130, rating: 3.8, reviews: 189, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600", ageRestricted: true, vendor: "QuickSip Beer Mart", vendorId: "v2", inStock: true },

  // FULL / HALF BOTTLES (cross-listed)
  { id: "p39", name: "Absolut Vodka Half Bottle",       brand: "Absolut",             category: "half",     subCategory: "half", size: "375ml", price: 750,  mrp: 840,  abv: "40%", rating: 4.2, reviews: 143, image: "https://images.unsplash.com/photo-1622957461299-baa843c9dc71?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", inStock: true, discount: 11 },
  { id: "p40", name: "Johnnie Walker Red Label Full",   brand: "Johnnie Walker",      category: "full",     subCategory: "full", size: "750ml", price: 1950, mrp: 2150, abv: "40%", rating: 4.4, reviews: 678, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=600", ageRestricted: true, vendor: "The Amber Room", vendorId: "v3", tag: "Premium", inStock: true, origin: "Scotland", discount: 9  },
];

export function getProductsByCategory(slug?: string) {
  if (!slug || slug === "all") return products;
  return products.filter((p) => p.category === slug);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.vendor.toLowerCase().includes(q)
  );
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const brands = [...new Set(products.map((p) => p.brand))];
export const vendors = [...new Set(products.map((p) => p.vendor))];
