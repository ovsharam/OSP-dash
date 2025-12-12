"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductReview, ProductQuestion } from "@/types";
import { getReviewsByProductId, getQuestionsByProductId, getAverageRating, getRatingBreakdown } from "@/lib/mockReviews";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = getReviewsByProductId(productId);
  const questions = getQuestionsByProductId(productId);
  const averageRating = getAverageRating(productId);
  const ratingBreakdown = getRatingBreakdown(productId);
  const [activeTab, setActiveTab] = useState<"reviews" | "questions">("reviews");
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>(() => {
    const counts: { [key: string]: number } = {};
    reviews.forEach((review) => {
      counts[review.id] = review.helpfulCount;
    });
    return counts;
  });

  const handleHelpful = (reviewId: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-black">{averageRating.toFixed(1)}</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-black mb-4">Rating Breakdown</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingBreakdown[rating] || 0;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 font-medium ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`px-4 py-2 font-medium ${
            activeTab === "questions"
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Q&A ({questions.length})
        </button>
      </div>

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    {review.userAvatar ? (
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-gray-600 font-semibold">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-black">{review.userName}</span>
                      {review.verifiedPurchase && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {review.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {review.title && (
                      <h4 className="font-semibold text-black mb-1">{review.title}</h4>
                    )}
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="text-sm text-gray-600 hover:text-black flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span>Helpful ({helpfulCounts[review.id] || review.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div className="space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-600">No questions yet. Ask a question about this product!</p>
          ) : (
            questions.map((question) => (
              <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-black">Q: {question.question}</span>
                    <span className="text-sm text-gray-500">
                      {question.askedBy} • {question.askedDate.toLocaleDateString()}
                    </span>
                  </div>
                  {question.answers.map((answer) => (
                    <div key={answer.id} className="ml-6 mt-3 p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-black">A:</span>
                        <span className="text-sm text-gray-700">{answer.answeredBy}</span>
                        {answer.isVendor && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Vendor
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {answer.answeredDate.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{answer.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
