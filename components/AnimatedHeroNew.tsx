export default function AnimatedHero() {
    return (
        <div className="relative bg-black h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600')] bg-cover bg-center" />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    The Marketplace for Sustainable Hospitality
                </h1>
                <p className="text-base text-gray-200 mb-6 max-w-2xl mx-auto">
                    Discover thousands of wholesale products from top organic brands.
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Start Browsing
                </button>
            </div>
        </div>
    );
}
