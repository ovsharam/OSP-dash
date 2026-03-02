"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BeveragesPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/browse");
  }, [router]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-charcoal italic mb-4">Redirecting to Collection...</h1>
      </div>
    </div>
  );
}
