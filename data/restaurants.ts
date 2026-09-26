export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  reviews: number;
  tag?: string;
  isAvailable: boolean;
  prepTime: string;
  calories?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  eta: string;
  banner: string;
  logo?: string;
  priceForTwo: number;
  minOrder: number;
  deliveryFee: number;
  address: string;
  city: string;
  isOpen: boolean;
  offer?: string;
  tags: string[];
  menu: MenuItem[];
}

export const foodCategories = [
  { slug: "veg-starters",    label: "Veg Starters",    emoji: "🥗" },
  { slug: "nonveg-starters", label: "Non-Veg Starters",emoji: "🍗" },
  { slug: "chicken",         label: "Chicken",          emoji: "🍗" },
  { slug: "mutton",          label: "Mutton",           emoji: "🥩" },
  { slug: "fish",            label: "Fish",             emoji: "🐟" },
  { slug: "seafood",         label: "Seafood",          emoji: "🦐" },
  { slug: "paneer",          label: "Paneer",           emoji: "🧀" },
  { slug: "chinese",         label: "Chinese",          emoji: "🥡" },
  { slug: "tandoori",        label: "Tandoori",         emoji: "🔥" },
  { slug: "kebabs",          label: "Kebabs",           emoji: "🍢" },
  { slug: "rolls",           label: "Rolls",            emoji: "🌯" },
  { slug: "burgers",         label: "Burgers",          emoji: "🍔" },
  { slug: "pizza",           label: "Pizza",            emoji: "🍕" },
  { slug: "fries",           label: "Fries",            emoji: "🍟" },
  { slug: "desserts",        label: "Desserts",         emoji: "🍮" },
  { slug: "soft-drinks",     label: "Soft Drinks",      emoji: "🥤" },
] as const;

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "The Grill House",
    cuisine: "BBQ • North Indian • Kebabs",
    rating: 4.5,
    reviews: 1243,
    eta: "28-35 min",
    banner: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
    priceForTwo: 600,
    minOrder: 200,
    deliveryFee: 30,
    address: "14, Connaught Place",
    city: "Delhi",
    isOpen: true,
    offer: "20% off on first order",
    tags: ["Bestseller", "Pure Veg", "Non-Veg"],
    menu: [
      { id: "m1r1", name: "Paneer Tikka",           description: "Marinated cottage cheese grilled in tandoor with peppers and onions",      price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600", category: "veg-starters",    isVeg: true,  rating: 4.6, reviews: 312, tag: "Bestseller", isAvailable: true, prepTime: "15 min", calories: 290 },
      { id: "m2r1", name: "Chicken Tikka",           description: "Tender chicken pieces marinated in spiced yogurt, grilled to perfection",  price: 320, mrp: 360, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600", category: "nonveg-starters", isVeg: false, rating: 4.7, reviews: 542, tag: "Chef's Special", isAvailable: true, prepTime: "18 min", calories: 350 },
      { id: "m3r1", name: "Dal Makhani",             description: "Slow-cooked black lentils with tomato, butter, and cream",                price: 240, mrp: 280, image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=600", category: "veg-starters",    isVeg: true,  rating: 4.5, reviews: 289, isAvailable: true, prepTime: "20 min", calories: 320 },
      { id: "m4r1", name: "Butter Chicken",          description: "Succulent chicken in rich tomato-butter gravy with cream",                price: 340, mrp: 380, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600", category: "chicken",         isVeg: false, rating: 4.8, reviews: 876, tag: "Bestseller", isAvailable: true, prepTime: "22 min", calories: 420 },
      { id: "m5r1", name: "Mutton Rogan Josh",       description: "Slow braised Kashmiri mutton in aromatic spiced gravy",                  price: 420, mrp: 480, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=600", category: "mutton",          isVeg: false, rating: 4.6, reviews: 421, isAvailable: true, prepTime: "30 min", calories: 480 },
      { id: "m6r1", name: "Seekh Kebab (Half Plate)", description: "Minced lamb skewers with herbs, grilled over charcoal",                price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1544369820-4b14df8b8d7e?q=80&w=600", category: "kebabs",          isVeg: false, rating: 4.5, reviews: 334, isAvailable: true, prepTime: "20 min", calories: 380 },
      { id: "m7r1", name: "Garlic Naan",             description: "Soft leavened bread baked in tandoor with garlic butter",                price: 60,  mrp: 70,  image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600", category: "veg-starters",    isVeg: true,  rating: 4.4, reviews: 198, isAvailable: true, prepTime: "8 min",  calories: 180 },
      { id: "m8r1", name: "Chocolate Brownie",       description: "Warm dark chocolate brownie with vanilla ice cream scoop",               price: 180, mrp: 200, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600", category: "desserts",        isVeg: true,  rating: 4.7, reviews: 241, tag: "Must Try", isAvailable: true, prepTime: "10 min", calories: 420 },
      { id: "m9r1", name: "Pepsi / Coke",            description: "Chilled soft drink, 300ml can",                                         price: 60,  mrp: 60,  image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?q=80&w=600", category: "soft-drinks",     isVeg: true,  rating: 4.1, reviews: 87,  isAvailable: true, prepTime: "2 min",  calories: 120 },
    ],
  },
  {
    id: "r2",
    name: "Wok & Roll",
    cuisine: "Chinese • Asian • Thai",
    rating: 4.3,
    reviews: 876,
    eta: "25-30 min",
    banner: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800",
    priceForTwo: 500,
    minOrder: 150,
    deliveryFee: 25,
    address: "22, Hauz Khas Village",
    city: "Delhi",
    isOpen: true,
    offer: "Free dessert above ₹400",
    tags: ["Chinese", "Asian"],
    menu: [
      { id: "m1r2", name: "Veg Spring Rolls",        description: "Crispy rolls stuffed with stir-fried vegetables and glass noodles",      price: 180, mrp: 200, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600", category: "veg-starters",    isVeg: true,  rating: 4.4, reviews: 312, tag: "Crispy", isAvailable: true, prepTime: "12 min", calories: 240 },
      { id: "m2r2", name: "Chicken Fried Rice",       description: "Wok-tossed rice with chicken, egg, and scallions in soy sauce",         price: 240, mrp: 280, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600", category: "chinese",         isVeg: false, rating: 4.5, reviews: 489, tag: "Bestseller", isAvailable: true, prepTime: "15 min", calories: 380 },
      { id: "m3r2", name: "Veg Hakka Noodles",       description: "Stir-fried noodles with colorful vegetables in Indo-Chinese sauce",     price: 200, mrp: 230, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600", category: "chinese",         isVeg: true,  rating: 4.3, reviews: 367, isAvailable: true, prepTime: "12 min", calories: 360 },
      { id: "m4r2", name: "Kung Pao Chicken",         description: "Spicy Sichuan chicken with peanuts, peppers, and scallions",           price: 300, mrp: 340, image: "https://images.unsplash.com/photo-1580217593608-f0c8e04d2dcb?q=80&w=600", category: "chicken",         isVeg: false, rating: 4.6, reviews: 287, tag: "Spicy", isAvailable: true, prepTime: "18 min", calories: 400 },
      { id: "m5r2", name: "Fish in Black Bean Sauce", description: "Pan-seared fish fillet in umami black bean sauce with ginger",         price: 320, mrp: 360, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600", category: "fish",            isVeg: false, rating: 4.4, reviews: 198, isAvailable: true, prepTime: "20 min", calories: 320 },
      { id: "m6r2", name: "Mango Ice Cream",          description: "Rich mango flavoured ice cream served in a chilled bowl",               price: 120, mrp: 140, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600", category: "desserts",        isVeg: true,  rating: 4.5, reviews: 156, isAvailable: true, prepTime: "5 min",  calories: 280 },
      { id: "m7r2", name: "Mojito (Virgin)",          description: "Refreshing mint-lime mocktail, served chilled",                        price: 130, mrp: 150, image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=600", category: "soft-drinks",     isVeg: true,  rating: 4.6, reviews: 234, isAvailable: true, prepTime: "5 min",  calories: 120 },
    ],
  },
  {
    id: "r3",
    name: "Tandoori Nights",
    cuisine: "Tandoori • Kebabs • Mughlai",
    rating: 4.6,
    reviews: 1654,
    eta: "30-40 min",
    banner: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=800",
    priceForTwo: 700,
    minOrder: 250,
    deliveryFee: 40,
    address: "8, Lajpat Nagar",
    city: "Delhi",
    isOpen: true,
    offer: "15% off + free raita",
    tags: ["Mughlai", "Kebabs", "Award Winning"],
    menu: [
      { id: "m1r3", name: "Galouti Kebab",           description: "Melt-in-the-mouth minced lamb patties with 30 spices, Lucknowi style",  price: 380, mrp: 420, image: "https://images.unsplash.com/photo-1544369820-4b14df8b8d7e?q=80&w=600", category: "kebabs",          isVeg: false, rating: 4.9, reviews: 876, tag: "Signature", isAvailable: true, prepTime: "25 min", calories: 360 },
      { id: "m2r3", name: "Tandoori Prawn",           description: "Tiger prawns marinated in saffron-yogurt, charred in live tandoor",    price: 480, mrp: 540, image: "https://images.unsplash.com/photo-1565280654386-36c3ea70bca1?q=80&w=600", category: "seafood",         isVeg: false, rating: 4.7, reviews: 543, tag: "Bestseller", isAvailable: true, prepTime: "22 min", calories: 310 },
      { id: "m3r3", name: "Paneer Malai Tikka",       description: "Creamy cottage cheese tikka with cashew-cream marinade",               price: 300, mrp: 340, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600", category: "paneer",          isVeg: true,  rating: 4.6, reviews: 412, tag: "Chef's Pick", isAvailable: true, prepTime: "15 min", calories: 350 },
      { id: "m4r3", name: "Biryani — Mutton Dum",    description: "Slow-dum cooked biryani with aged basmati and whole spices",           price: 420, mrp: 480, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600", category: "mutton",          isVeg: false, rating: 4.8, reviews: 987, tag: "Must Try", isAvailable: true, prepTime: "35 min", calories: 580 },
      { id: "m5r3", name: "Chicken Tikka Roll",       description: "Flaky laccha paratha rolled with chicken tikka, chutney, and onions",  price: 200, mrp: 230, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=600", category: "rolls",           isVeg: false, rating: 4.5, reviews: 334, isAvailable: true, prepTime: "15 min", calories: 420 },
      { id: "m6r3", name: "Gulab Jamun (2 pcs)",     description: "Soft milk-solid dumplings soaked in rose syrup, served warm",          price: 100, mrp: 120, image: "https://images.unsplash.com/photo-1601303516534-bf4c4b0dd80b?q=80&w=600", category: "desserts",        isVeg: true,  rating: 4.8, reviews: 623, tag: "Classic",    isAvailable: true, prepTime: "5 min",  calories: 280 },
    ],
  },
  {
    id: "r4",
    name: "Burger Barn",
    cuisine: "Burgers • American • Fast Food",
    rating: 4.2,
    reviews: 743,
    eta: "20-28 min",
    banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
    priceForTwo: 350,
    minOrder: 100,
    deliveryFee: 20,
    address: "32, Saket Select City Walk",
    city: "Delhi",
    isOpen: true,
    offer: "Buy 2 Get 1 Free on weekends",
    tags: ["Burgers", "Fast Food", "Kid Friendly"],
    menu: [
      { id: "m1r4", name: "Classic Smash Burger",    description: "Double smashed beef patty with cheddar, lettuce, pickles, and special sauce", price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600", category: "burgers", isVeg: false, rating: 4.6, reviews: 542, tag: "Bestseller", isAvailable: true, prepTime: "15 min", calories: 620 },
      { id: "m2r4", name: "Crispy Chicken Burger",   description: "Buttermilk-fried crispy chicken with coleslaw and sriracha mayo",          price: 260, mrp: 300, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600", category: "burgers", isVeg: false, rating: 4.4, reviews: 389, isAvailable: true, prepTime: "15 min", calories: 540 },
      { id: "m3r4", name: "Veg Mushroom Burger",     description: "Portobello mushroom patty with gouda cheese and truffle mayo",            price: 230, mrp: 260, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600", category: "burgers", isVeg: true,  rating: 4.3, reviews: 211, isAvailable: true, prepTime: "12 min", calories: 480 },
      { id: "m4r4", name: "Loaded Cheese Fries",     description: "Crispy fries with nacho cheese, jalapeños, and sour cream",             price: 180, mrp: 200, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600", category: "fries", isVeg: true, rating: 4.5, reviews: 423, tag: "Must Try", isAvailable: true, prepTime: "10 min", calories: 480 },
      { id: "m5r4", name: "Oreo Shake",              description: "Thick creamy shake blended with Oreo cookies and vanilla ice cream",      price: 180, mrp: 200, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600", category: "soft-drinks", isVeg: true, rating: 4.7, reviews: 312, isAvailable: true, prepTime: "5 min", calories: 450 },
    ],
  },
  {
    id: "r5",
    name: "Pizza Amore",
    cuisine: "Pizza • Italian • Pasta",
    rating: 4.4,
    reviews: 1089,
    eta: "35-45 min",
    banner: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
    priceForTwo: 550,
    minOrder: 200,
    deliveryFee: 35,
    address: "6, Cyber Hub, Gurugram",
    city: "Gurugram",
    isOpen: true,
    offer: "Extra 10% on orders above ₹500",
    tags: ["Pizza", "Italian", "Cheesy"],
    menu: [
      { id: "m1r5", name: "Margherita (12-inch)",    description: "Classic tomato sauce with fresh mozzarella, basil, and olive oil",      price: 380, mrp: 420, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600", category: "pizza", isVeg: true,  rating: 4.5, reviews: 678, tag: "Classic", isAvailable: true, prepTime: "25 min", calories: 680 },
      { id: "m2r5", name: "BBQ Chicken Pizza",       description: "Smoky BBQ sauce, chicken, red onions, and pepper jack cheese",         price: 450, mrp: 500, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600", category: "pizza", isVeg: false, rating: 4.6, reviews: 543, tag: "Bestseller", isAvailable: true, prepTime: "28 min", calories: 780 },
      { id: "m3r5", name: "Truffle Mushroom Pizza",  description: "Truffle oil, wild mushrooms, gouda, and arugula on thin crust",       price: 520, mrp: 580, image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=600", category: "pizza", isVeg: true,  rating: 4.7, reviews: 312, tag: "Premium", isAvailable: true, prepTime: "28 min", calories: 720 },
      { id: "m4r5", name: "Tiramisu",                description: "Classic Italian dessert with espresso, mascarpone, and cocoa dust",     price: 220, mrp: 250, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600", category: "desserts", isVeg: true, rating: 4.8, reviews: 289, tag: "Signature", isAvailable: true, prepTime: "5 min", calories: 380 },
    ],
  },
];

export function getRestaurantById(id: string) {
  return restaurants.find((r) => r.id === id);
}

export function searchRestaurants(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return restaurants;
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q))
  );
}
