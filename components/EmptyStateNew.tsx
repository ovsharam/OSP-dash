import Link from "next/link";

export function EmptyCart() {
    return (
        <div className="text-center py-16 px-4">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Looks like you haven't added any items to your cart yet. Browse our
                collection to find what you need.
            </p>
            <Link
                href="/browse"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
                Start Shopping
            </Link>
        </div>
    );
}
