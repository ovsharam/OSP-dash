import { ProductReview, ProductQuestion } from "@/types";

export const mockReviews: ProductReview[] = [
  {
    id: "rev-1",
    productId: "1",
    userId: "user-1",
    userName: "Sarah Johnson",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    title: "Excellent quality and taste!",
    comment: "We've been using this organic ginger root soda for our restaurant and our customers love it. The flavor is authentic and refreshing. Highly recommend!",
    date: new Date("2024-01-05"),
    verifiedPurchase: true,
    helpfulCount: 12,
  },
  {
    id: "rev-2",
    productId: "1",
    userId: "user-2",
    userName: "Michael Chen",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    title: "Perfect for our cafe",
    comment: "Great product, fast shipping, and excellent customer service. The organic certification is important to us and our customers appreciate it.",
    date: new Date("2024-01-10"),
    verifiedPurchase: true,
    helpfulCount: 8,
  },
  {
    id: "rev-3",
    productId: "2",
    userId: "user-3",
    userName: "Emily Rodriguez",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
    title: "Good sparkling water",
    comment: "Nice clean taste, zero calories is a plus. Our health-conscious customers appreciate this option.",
    date: new Date("2024-01-08"),
    verifiedPurchase: true,
    helpfulCount: 5,
  },
  {
    id: "rev-4",
    productId: "19",
    userId: "user-4",
    userName: "David Park",
    userAvatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    title: "Eco-friendly and durable",
    comment: "These bamboo straws are perfect for our sustainable restaurant concept. They're sturdy and our customers love the eco-friendly approach.",
    date: new Date("2024-01-12"),
    verifiedPurchase: true,
    helpfulCount: 15,
  },
  {
    id: "rev-5",
    productId: "20",
    userId: "user-5",
    userName: "Lisa Thompson",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    title: "Compostable plates are amazing",
    comment: "We switched to these wheat straw plates and couldn't be happier. They're durable, look great, and knowing they're compostable makes us feel good about our environmental impact.",
    date: new Date("2024-01-11"),
    verifiedPurchase: true,
    helpfulCount: 20,
  },
];

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


