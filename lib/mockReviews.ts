import { ProductReview, ProductQuestion } from "@/types";

// Review templates for generating diverse reviews
const reviewTemplates = [
  {
    userName: "Sarah Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    titles: [
      "Excellent quality and taste!",
      "Perfect for our restaurant",
      "Highly recommend!",
      "Great value for money",
      "Outstanding product",
    ],
    comments: [
      "We've been using this product for our restaurant and our customers love it. The quality is exceptional and the flavor is authentic.",
      "Great product, fast shipping, and excellent customer service. The quality is consistent and our customers appreciate it.",
      "This has become a staple in our inventory. The quality is top-notch and the pricing is fair. Highly recommend!",
      "Excellent value for the quality. We've ordered multiple times and have never been disappointed. Fast shipping too!",
      "Outstanding product that meets all our expectations. The quality is consistent and the service is excellent.",
    ],
    ratings: [5, 5, 4, 5, 4],
    helpfulCounts: [12, 8, 15, 10, 7],
  },
  {
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    titles: [
      "Good quality product",
      "Meets expectations",
      "Reliable supplier",
      "Decent value",
      "Satisfied customer",
    ],
    comments: [
      "Good quality product that works well for our needs. Shipping was prompt and packaging was secure.",
      "The product meets our expectations. Quality is good and the price is reasonable. Would order again.",
      "Reliable supplier with consistent quality. We've ordered multiple times and are always satisfied.",
      "Decent value for the price. The product works as expected and delivery was on time.",
      "Satisfied with the purchase. The product quality is good and the service is professional.",
    ],
    ratings: [4, 4, 5, 4, 4],
    helpfulCounts: [6, 5, 9, 4, 6],
  },
  {
    userName: "Emily Rodriguez",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    titles: [
      "Nice clean taste",
      "Good for health-conscious customers",
      "Quality product",
      "Well packaged",
      "Fast delivery",
    ],
    comments: [
      "Nice clean taste, our health-conscious customers appreciate this option. Quality is consistent.",
      "Good product that aligns with our values. Customers appreciate the quality and we appreciate the service.",
      "Quality product that delivers on its promises. We've been happy with our orders.",
      "Well packaged and arrived in perfect condition. The product quality is excellent.",
      "Fast delivery and good quality. The product meets our standards and customers are happy.",
    ],
    ratings: [4, 5, 4, 5, 4],
    helpfulCounts: [5, 11, 7, 8, 5],
  },
  {
    userName: "David Park",
    userAvatar: "https://i.pravatar.cc/150?img=4",
    titles: [
      "Eco-friendly and durable",
      "Sustainable choice",
      "Great for the environment",
      "Quality eco product",
      "Love the sustainability",
    ],
    comments: [
      "These eco-friendly products are perfect for our sustainable restaurant concept. They're sturdy and our customers love the approach.",
      "Sustainable choice that doesn't compromise on quality. We're happy to support eco-friendly suppliers.",
      "Great for the environment and great quality too. Our customers appreciate our commitment to sustainability.",
      "Quality eco product that performs well. We're satisfied with both the product and the service.",
      "Love the sustainability aspect. The product quality is excellent and we'll definitely order again.",
    ],
    ratings: [5, 5, 5, 4, 5],
    helpfulCounts: [15, 12, 18, 9, 14],
  },
  {
    userName: "Lisa Thompson",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    titles: [
      "Amazing quality",
      "Exceeded expectations",
      "Best supplier we've worked with",
      "Top notch product",
      "Will order again",
    ],
    comments: [
      "Amazing quality that exceeded our expectations. The product is well-made and our customers love it.",
      "Exceeded expectations in both quality and service. This has become one of our go-to suppliers.",
      "Best supplier we've worked with. Consistent quality, great prices, and excellent customer service.",
      "Top notch product that delivers on every front. Quality, price, and service are all excellent.",
      "Will definitely order again. The product quality is outstanding and the service is professional.",
    ],
    ratings: [5, 5, 5, 5, 5],
    helpfulCounts: [20, 16, 22, 18, 15],
  },
  {
    userName: "James Wilson",
    userAvatar: "https://i.pravatar.cc/150?img=6",
    titles: [
      "Good but could be better",
      "Decent product",
      "Average quality",
      "Meets basic needs",
      "Okay for the price",
    ],
    comments: [
      "Good product but could be better. Quality is decent but not exceptional. Price is fair though.",
      "Decent product that serves its purpose. Nothing extraordinary but it works for our needs.",
      "Average quality product. It does the job but there might be better options out there.",
      "Meets our basic needs. Quality is acceptable and the price is reasonable.",
      "Okay for the price point. Quality is adequate but not outstanding.",
    ],
    ratings: [3, 3, 3, 3, 3],
    helpfulCounts: [3, 2, 4, 3, 2],
  },
  {
    userName: "Maria Garcia",
    userAvatar: "https://i.pravatar.cc/150?img=7",
    titles: [
      "Fast shipping",
      "Quick delivery",
      "Efficient service",
      "On-time delivery",
      "Great logistics",
    ],
    comments: [
      "Fast shipping and good quality. The product arrived quickly and in perfect condition.",
      "Quick delivery and excellent packaging. The product quality is good and we're satisfied.",
      "Efficient service from order to delivery. The product meets our quality standards.",
      "On-time delivery as promised. Product quality is consistent and we're happy with our purchase.",
      "Great logistics and customer service. The product quality is good and delivery is always prompt.",
    ],
    ratings: [4, 5, 4, 4, 5],
    helpfulCounts: [7, 9, 6, 8, 10],
  },
  {
    userName: "Robert Brown",
    userAvatar: "https://i.pravatar.cc/150?img=8",
    titles: [
      "Professional service",
      "Business-grade quality",
      "Perfect for commercial use",
      "Reliable for restaurants",
      "Commercial quality",
    ],
    comments: [
      "Professional service and business-grade quality. Perfect for our commercial operations.",
      "Business-grade quality that's perfect for our needs. Service is professional and reliable.",
      "Perfect for commercial use. Quality is consistent and the product performs well in our setting.",
      "Reliable for restaurants and food service. Quality is good and pricing is competitive.",
      "Commercial quality product that meets our standards. Service is excellent and delivery is prompt.",
    ],
    ratings: [5, 5, 4, 5, 4],
    helpfulCounts: [11, 13, 8, 12, 9],
  },
];

// Generate reviews for all products
const generateReviewsForProduct = (productId: string, reviewCount: number = 3): ProductReview[] => {
  const reviews: ProductReview[] = [];
  const dates = [
    new Date("2024-12-01"),
    new Date("2024-11-15"),
    new Date("2024-11-01"),
    new Date("2024-10-20"),
    new Date("2024-10-05"),
    new Date("2024-09-18"),
    new Date("2024-09-01"),
    new Date("2024-08-15"),
  ];

  for (let i = 0; i < reviewCount; i++) {
    const template = reviewTemplates[i % reviewTemplates.length];
    const titleIndex = Math.floor(i / reviewTemplates.length) % template.titles.length;
    const commentIndex = Math.floor(i / reviewTemplates.length) % template.comments.length;
    const ratingIndex = i % template.ratings.length;

    // Use productId and index to create semi-random but deterministic values
    const seed = parseInt(productId) + i;
    const isVerified = seed % 3 !== 0; // Deterministic Boolean
    const additionalHelpful = seed % 10; // Deterministic small number

    reviews.push({
      id: `rev-${productId}-${i + 1}`,
      productId,
      userId: `user-${productId}-${i + 1}`,
      userName: template.userName,
      userAvatar: template.userAvatar,
      rating: template.ratings[ratingIndex],
      title: template.titles[titleIndex],
      comment: template.comments[commentIndex],
      date: dates[i % dates.length],
      verifiedPurchase: isVerified,
      helpfulCount: template.helpfulCounts[ratingIndex] + additionalHelpful,
    });
  }

  return reviews;
};

// All product IDs from mockData.ts
const allProductIds = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
  "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
  "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
  "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
];

// Generate reviews for all products (deterministic count per product)
export const mockReviews: ProductReview[] = allProductIds.flatMap((productId) => {
  const seed = parseInt(productId) || 0;
  const reviewCount = 3 + (seed % 3); // Consistent 3-5 reviews per product
  return generateReviewsForProduct(productId, reviewCount);
});

export const mockQuestions: ProductQuestion[] = [
  {
    id: "q-1",
    productId: "1",
    question: "What is the shelf life of this product?",
    askedBy: "Restaurant Owner",
    askedDate: new Date("2024-01-10"),
    answers: [
      {
        id: "a-1",
        answer: "The shelf life is 12 months from production date when stored properly.",
        answeredBy: "Pure Soda Co.",
        answeredDate: new Date("2024-01-11"),
        isVendor: true,
      },
    ],
  },
  {
    id: "q-2",
    productId: "19",
    question: "Are these straws reusable?",
    askedBy: "Cafe Manager",
    askedDate: new Date("2024-01-09"),
    answers: [
      {
        id: "a-2",
        answer: "Yes, these bamboo straws are reusable and can be cleaned with warm soapy water. They're designed for multiple uses.",
        answeredBy: "Eco Tableware Co.",
        answeredDate: new Date("2024-01-09"),
        isVendor: true,
      },
    ],
  },
  {
    id: "q-3",
    productId: "2",
    question: "Is this product organic certified?",
    askedBy: "Health Food Store",
    askedDate: new Date("2024-11-20"),
    answers: [
      {
        id: "a-3",
        answer: "Yes, this product is USDA Organic certified. All ingredients are organic and the certification is clearly marked on the packaging.",
        answeredBy: "Sparkle Beverages",
        answeredDate: new Date("2024-11-21"),
        isVendor: true,
      },
    ],
  },
  {
    id: "q-4",
    productId: "14",
    question: "What are the dimensions of this equipment?",
    askedBy: "Restaurant Manager",
    askedDate: new Date("2024-10-15"),
    answers: [
      {
        id: "a-4",
        answer: "The dimensions are 36\" x 24\" x 48\" (L x W x H). Please ensure you have adequate space for installation.",
        answeredBy: "Beverage Equipment Pro",
        answeredDate: new Date("2024-10-16"),
        isVendor: true,
      },
    ],
  },
];

export function getReviewsByProductId(productId: string): ProductReview[] {
  return mockReviews.filter((r) => r.productId === productId);
}

export function getQuestionsByProductId(productId: string): ProductQuestion[] {
  return mockQuestions.filter((q) => q.productId === productId);
}

export function getAverageRating(productId: string): number {
  const reviews = getReviewsByProductId(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export function getRatingBreakdown(productId: string): { [key: number]: number } {
  const reviews = getReviewsByProductId(productId);
  const breakdown: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((review) => {
    breakdown[review.rating as keyof typeof breakdown]++;
  });
  return breakdown;
}
