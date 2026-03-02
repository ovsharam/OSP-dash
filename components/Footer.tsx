"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/login") || pathname?.startsWith("/register")) {
        return null;
    }

    return (
        <footer className="bg-[#5c0f0f] text-[#ece4d0] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Logo & tagline */}
                <div className="mb-12 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ece4d0] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#5c0f0f] font-serif text-2xl font-bold">W</span>
                    </div>
                    <div>
                        <p className="font-serif text-xl font-bold tracking-wide text-[#ece4d0] uppercase">Worldwide Chocolate</p>
                        <p className="text-[#d1b181] text-sm mt-1">The world's finest artisan chocolate marketplace.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-bold text-[#d1b181] tracking-widest uppercase mb-4">Shop</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "All Chocolate", href: "/browse" },
                                { label: "By Brand", href: "/browse?filter=brand" },
                                { label: "By Origin", href: "/browse?filter=origin" },
                                { label: "Best Sellers", href: "/browse?filter=bestseller" },
                                { label: "New Arrivals", href: "/browse?filter=new" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#ece4d0]/80 hover:text-[#d1b181] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brands */}
                    <div>
                        <h3 className="text-xs font-bold text-[#d1b181] tracking-widest uppercase mb-4">Brands</h3>
                        <ul className="space-y-3">
                            {["Valrhona", "Callebaut", "KESSHŌ", "Amedei", "Michel Cluizel"].map((brand) => (
                                <li key={brand}>
                                    <Link
                                        href={`/browse?brand=${encodeURIComponent(brand)}`}
                                        className="text-sm text-[#ece4d0]/80 hover:text-[#d1b181] transition-colors"
                                    >
                                        {brand}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Origins */}
                    <div>
                        <h3 className="text-xs font-bold text-[#d1b181] tracking-widest uppercase mb-4">Origins</h3>
                        <ul className="space-y-3">
                            {["Madagascar", "Ecuador", "Peru", "Venezuela", "Ghana"].map((origin) => (
                                <li key={origin}>
                                    <Link
                                        href={`/browse?origin=${encodeURIComponent(origin)}`}
                                        className="text-sm text-[#ece4d0]/80 hover:text-[#d1b181] transition-colors"
                                    >
                                        {origin}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-bold text-[#d1b181] tracking-widest uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            {[
                                { label: "About Us", href: "#" },
                                { label: "Wholesale Program", href: "#" },
                                { label: "Help Center", href: "#" },
                                { label: "Shipping Info", href: "#" },
                                { label: "Contact Us", href: "#" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-[#ece4d0]/80 hover:text-[#d1b181] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#d1b181]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#ece4d0]/60">
                        &copy; {new Date().getFullYear()} Worldwide Chocolate Marketplace. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-[#ece4d0]/60 hover:text-[#d1b181] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-[#ece4d0]/60 hover:text-[#d1b181] transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-xs text-[#ece4d0]/60 hover:text-[#d1b181] transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
