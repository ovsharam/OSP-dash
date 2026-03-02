import { Product, Vendor, Category, Brand } from "@/types";

export const mockVendors: Record<string, Vendor> = {
  v1: {
    id: "v1",
    name: "Valrhona",
    location: "Tain-l'Hermitage, France",
    rating: 4.9,
    reviewCount: 1250,
  },
  v2: {
    id: "v2",
    name: "Callebaut",
    location: "Wieze, Belgium",
    rating: 4.8,
    reviewCount: 3400,
  },
  v3: {
    id: "v3",
    name: "KESSHŌ",
    location: "Kyoto, Japan",
    rating: 5.0,
    reviewCount: 85,
  },
  v4: {
    id: "v4",
    name: "Amedei",
    location: "Tuscany, Italy",
    rating: 4.9,
    reviewCount: 420,
  },
  v5: {
    id: "v5",
    name: "Dandelion",
    location: "San Francisco, USA",
    rating: 4.8,
    reviewCount: 310,
  },
  v6: {
    id: "v6",
    name: "Michel Cluizel",
    location: "Damville, France",
    rating: 4.9,
    reviewCount: 890,
  },
  v7: {
    id: "v7",
    name: "Soma Chocolatemaker",
    location: "Toronto, Canada",
    rating: 4.9,
    reviewCount: 275,
  },
  v8: {
    id: "v8",
    name: "Guittard",
    location: "Burlingame, USA",
    rating: 4.7,
    reviewCount: 1560,
  }
};

export const mockCategories: Category[] = [
  { id: "c1", name: "Dark Chocolate Bars", count: 142, image: "https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg" },
  { id: "c2", name: "Couverture & Baking", count: 86, image: "https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png" },
  { id: "c3", name: "Milk Chocolate Bars", count: 94, image: "https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Milk-Chocolate-Wafers-with-Colored-Nonpareils-1-400x400.jpg" },
  { id: "c4", name: "Truffles & Bonbons", count: 56, image: "https://worldwidechocolate.com/wp-content/uploads/2019/01/Côte-d’Or-Bouchée-Milk-Chocolate-with-Praline-Filling-1-scaled-400x400.jpg" },
  { id: "c5", name: "White & Blonde", count: 32, image: "https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg" },
  { id: "c6", name: "Gift Collections", count: 48, image: "https://worldwidechocolate.com/wp-content/uploads/2022/10/Guylian-6-Piece-chocolate-seashells-400x400.jpg" },
];

export const mockProducts: Product[] = [
  // Valrhona
  {
    id: "p1",
    name: "Guanaja 70% Dark Chocolate Féves",
    description: "Valrhona’s legendary dark chocolate with an exceptionally bitter, deeply roasted flavor profile. Perfect for professional baking and enrobing.",
    price: 38.50,
    compareAtPrice: 45.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg"],
    vendor: mockVendors.v1,
    category: "Couverture & Baking",
    tags: ["Dark", "Féves", "70%", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 3,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p2",
    name: "Caraïbe 66% Dark Chocolate Bar",
    description: "A balanced, soft dark chocolate made from a blend of Caribbean Trinitario beans. Notes of roasted nuts and sweet spices.",
    price: 5.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Coucher-du-Soleil-72-Dark-Couverture-Chocolate-Wafers-400x400.jpg"],
    vendor: mockVendors.v1,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "66%", "Caribbean", "Bar"],
    inStock: true,
    sampleAvailable: false,
    minOrderQuantity: 12,
    shippingOptions: []
  },
  {
    id: "p3",
    name: "Jivara 40% Milk Chocolate",
    description: "Exceptional milk chocolate with pronounced cocoa taste, creamy tone, and notes of vanilla and malt.",
    price: 36.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2021/01/Guittard-Milk-Chocolate-Flavored-APeels-scaled-400x400.jpg"],
    vendor: mockVendors.v1,
    category: "Couverture & Baking",
    tags: ["Milk", "40%", "Féves", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 3,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p4",
    name: "Dulcey 35% Blonde Chocolate",
    description: "The world's first blonde chocolate. Delicately sweet with intense biscuit and caramelized milk flavors.",
    price: 42.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg"],
    vendor: mockVendors.v1,
    category: "White & Blonde",
    tags: ["Blonde", "35%", "Féves", "Caramel"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 3,
    isNew: true,
    shippingOptions: []
  },

  // Callebaut
  {
    id: "p5",
    name: "811 Dark Recipe 54.5% Callets",
    description: "The universally trusted dark chocolate for professionals. Well-balanced bitter cocoa taste.",
    price: 28.00,
    compareAtPrice: 32.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
    vendor: mockVendors.v2,
    category: "Couverture & Baking",
    tags: ["Dark", "54.5%", "Callets", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 5,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p6",
    name: "823 Milk Recipe 33.6% Callets",
    description: "Iconic milk chocolate with a deep, warm color and balanced cocoa, milk, and caramel notes.",
    price: 29.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2024/04/Callebaut-44-Dark-Chocolate-Baking-Sticks-400x400.jpg"],
    vendor: mockVendors.v2,
    category: "Couverture & Baking",
    tags: ["Milk", "33.6%", "Callets", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 5,
    shippingOptions: []
  },
  {
    id: "p7",
    name: "W2 White Recipe 28% Callets",
    description: "Silky, creamy white chocolate with a balanced vanilla flavor. Perfect for mousses and ganaches.",
    price: 31.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg"],
    vendor: mockVendors.v2,
    category: "Couverture & Baking",
    tags: ["White", "28%", "Callets", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 5,
    shippingOptions: []
  },

  // KESSHŌ
  {
    id: "p8",
    name: "Kyoto Matcha White Chocolate Bar",
    description: "Ceremonial grade Uji matcha folded into craft white chocolate. Deep umami and delicate sweetness.",
    price: 12.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg"], // Green-ish abstract or matcha
    vendor: mockVendors.v3,
    category: "White & Blonde",
    tags: ["White", "Matcha", "Japan", "Bar"],
    inStock: true,
    sampleAvailable: false,
    minOrderQuantity: 20,
    isNew: true,
    shippingOptions: []
  },
  {
    id: "p9",
    name: "Yuzu 70% Dark Chocolate",
    description: "Single-origin Tanzanian cocoa infused with vibrant, aromatic Japanese yuzu zest.",
    price: 14.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Coucher-du-Soleil-72-Dark-Couverture-Chocolate-Wafers-400x400.jpg"],
    vendor: mockVendors.v3,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Yuzu", "Japan", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 15,
    shippingOptions: []
  },

  // Amedei
  {
    id: "p10",
    name: "Amedei Porcelana 70%",
    description: "Made from the rarest white cocoa beans in the world. Exceptional refinement, notes of toasted almonds and olive grove.",
    price: 18.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg"],
    vendor: mockVendors.v4,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Porcelana", "Venezuela", "Bar"],
    inStock: true,
    sampleAvailable: false,
    minOrderQuantity: 10,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p11",
    name: "Toscano Black 70%",
    description: "A signature blend that captures the essence of Amedei. Notes of tobacco, roasted malt, and cedar.",
    price: 9.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
    vendor: mockVendors.v4,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Blend", "Italy", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 24,
    shippingOptions: []
  },

  // Dandelion
  {
    id: "p12",
    name: "Maya Mountain, Belize 70%",
    description: "Notes of honey, strawberry, and roasted nuts. Two ingredients only: cocoa beans and organic sugar.",
    price: 8.50,
    compareAtPrice: 10.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Coucher-du-Soleil-72-Dark-Couverture-Chocolate-Wafers-400x400.jpg"],
    vendor: mockVendors.v5,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Belize", "Single Origin", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 24,
    shippingOptions: []
  },
  {
    id: "p13",
    name: "Ambanja, Madagascar 70%",
    description: "Bright acidity with tasting notes of raspberries, citrus fruit, and roasted peanuts.",
    price: 8.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
    vendor: mockVendors.v5,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Madagascar", "Single Origin", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 24,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p14",
    name: "Kokoa Kamili, Tanzania 70%",
    description: "Vibrant and fruity, featuring notes of cherry, plum, and a hint of chocolate cake.",
    price: 8.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2024/04/Callebaut-44-Dark-Chocolate-Baking-Sticks-400x400.jpg"],
    vendor: mockVendors.v5,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Tanzania", "Single Origin", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 24,
    shippingOptions: []
  },

  // Michel Cluizel
  {
    id: "p15",
    name: "Mangaro Noir 71% Single Estate",
    description: "From the Mangaro plantation in Madagascar. Reveals notes of exotic fruits, honey, and gingerbread.",
    price: 7.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Coucher-du-Soleil-72-Dark-Couverture-Chocolate-Wafers-400x400.jpg"],
    vendor: mockVendors.v6,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "71%", "Madagascar", "Single Estate", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 20,
    shippingOptions: []
  },
  {
    id: "p16",
    name: "Macadamia Nut Praline Bonbons (Box of 24)",
    description: "Handcrafted bonbons featuring a smooth macadamia nut praline enrobed in 63% dark chocolate.",
    price: 35.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Côte-d’Or-Bouchée-Milk-Chocolate-with-Praline-Filling-1-scaled-400x400.jpg"],
    vendor: mockVendors.v6,
    category: "Truffles & Bonbons",
    tags: ["Praline", "Bonbons", "Gift", "France"],
    inStock: true,
    sampleAvailable: false,
    minOrderQuantity: 5,
    isNew: true,
    shippingOptions: []
  },
  {
    id: "p17",
    name: "Plantation Riachuelo 51% Milk",
    description: "Brazilian estate milk chocolate with notes of roasted cocoa, dried fruit, and a hint of spice.",
    price: 7.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2021/01/Guittard-Milk-Chocolate-Flavored-APeels-scaled-400x400.jpg"],
    vendor: mockVendors.v6,
    category: "Milk Chocolate Bars",
    tags: ["Milk", "51%", "Brazil", "Single Estate", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 20,
    shippingOptions: []
  },

  // Soma
  {
    id: "p18",
    name: "Porcelana 70% Dark Bar",
    description: "Incredibly smooth texture with delicate flavors of strawberries, cream, and roasted nuts.",
    price: 15.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
    vendor: mockVendors.v7,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Porcelana", "Venezuela", "Bar"],
    inStock: false,
    sampleAvailable: false,
    minOrderQuantity: 10,
    shippingOptions: []
  },
  {
    id: "p19",
    name: "Brown Butter Rum Bar",
    description: "A magical blend of browned butter, dark rum, and milk chocolate. Comforting and rich.",
    price: 11.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Milk-Chocolate-Wafers-with-Colored-Nonpareils-1-400x400.jpg"],
    vendor: mockVendors.v7,
    category: "Milk Chocolate Bars",
    tags: ["Milk", "Rum", "Brown Butter", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 15,
    isBestseller: true,
    shippingOptions: []
  },

  // Guittard
  {
    id: "p20",
    name: "L'Etoile du Nord 64% Dark Wafers",
    description: "Smooth, balanced dark chocolate. Excellent for ganaches, mousses, and baking applications.",
    price: 45.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg"],
    vendor: mockVendors.v8,
    category: "Couverture & Baking",
    tags: ["Dark", "64%", "Wafers", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 2,
    shippingOptions: []
  },
  {
    id: "p21",
    name: "Creme Francaise 31% White Wafers",
    description: "Rich, creamy white chocolate made with real cocoa butter and Madagascar vanilla.",
    price: 48.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg"],
    vendor: mockVendors.v8,
    category: "Couverture & Baking",
    tags: ["White", "31%", "Wafers", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 2,
    shippingOptions: []
  },
  {
    id: "p22",
    name: "Grand Cacao Drinking Chocolate",
    description: "A rich, European-style drinking chocolate made with Dutch-processed cocoa powder and hints of vanilla.",
    price: 12.00,
    compareAtPrice: 15.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Callebaut-100-Cocoa-Powder-CP776-400x400.png"],
    vendor: mockVendors.v8,
    category: "Couverture & Baking",
    tags: ["Cocoa Powder", "Drinking Chocolate", "USA"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 12,
    isNew: true,
    shippingOptions: []
  },

  // Extra Valrhona gifts / boxes
  {
    id: "p23",
    name: "Valrhona Origin Grand Cru Gift Box",
    description: "An elegant tasting box featuring 50 squares of Valrhona's finest single-origin dark chocolates.",
    price: 28.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2022/10/Guylian-6-Piece-chocolate-seashells-400x400.jpg"],
    vendor: mockVendors.v1,
    category: "Gift Collections",
    tags: ["Gift Box", "Dark", "Tasting", "France"],
    inStock: true,
    sampleAvailable: false,
    minOrderQuantity: 10,
    isBestseller: true,
    shippingOptions: []
  },
  {
    id: "p24",
    name: "Inspiration Passion Fruit Féves",
    description: "A groundbreaking fruit couverture. The intense, tangy taste of passion fruit combined with the texture of chocolate.",
    price: 52.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg"], // Just using a white chocolateish image for inspiration line
    vendor: mockVendors.v1,
    category: "Couverture & Baking",
    tags: ["Fruit", "Inspiration", "Féves", "Baking"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 3,
    shippingOptions: []
  },

  // Extra Dandelion
  {
    id: "p25",
    name: "Costa Esmeraldas, Ecuador 70%",
    description: "Fudgy and rich, with tasting notes of cherry blossom, chocolate buttercream, and toasted nuts.",
    price: 8.50,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Guittard-Coucher-du-Soleil-72-Dark-Couverture-Chocolate-Wafers-400x400.jpg"],
    vendor: mockVendors.v5,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Ecuador", "Single Origin", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 24,
    shippingOptions: []
  },

  // Extra Soma
  {
    id: "p26",
    name: "Stratus 70% Dark Blend",
    description: "A blend of beans from various origins aged in wine barrels from Stratus Vineyards. Complex and tannic.",
    price: 14.00,
    images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
    vendor: mockVendors.v7,
    category: "Dark Chocolate Bars",
    tags: ["Dark", "70%", "Blend", "Barrel Aged", "Bar"],
    inStock: true,
    sampleAvailable: true,
    minOrderQuantity: 15,
    isNew: true,
    shippingOptions: []
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getVendors(): Vendor[] {
  return Object.values(mockVendors);
}
