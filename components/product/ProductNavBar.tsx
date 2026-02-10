import Link from 'next/link';

const ProductNavBar = () => {
    return (
        <div className="sticky top-0 bg-white border-b border-gray-200 z-[50] shadow-sm mb-8" style={{ top: '-1px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="flex items-center gap-8 text-sm font-semibold text-gray-600 overflow-x-auto">
                    <li>
                        <a href="#overview" className="block py-4 border-b-2 border-transparent hover:text-[#008060] hover:border-[#008060] transition-colors whitespace-nowrap">
                            Overview
                        </a>
                    </li>
                    <li>
                        <a href="#specs" className="block py-4 border-b-2 border-transparent hover:text-[#008060] hover:border-[#008060] transition-colors whitespace-nowrap">
                            Specs
                        </a>
                    </li>
                    <li>
                        <a href="#shipping" className="block py-4 border-b-2 border-transparent hover:text-[#008060] hover:border-[#008060] transition-colors whitespace-nowrap">
                            Shipping
                        </a>
                    </li>
                    <li>
                        <a href="#reviews" className="block py-4 border-b-2 border-transparent hover:text-[#008060] hover:border-[#008060] transition-colors whitespace-nowrap">
                            Reviews
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductNavBar;
