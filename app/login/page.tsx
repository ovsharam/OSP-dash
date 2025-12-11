"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignupModal from "@/components/SignupModal";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSignupModal, setShowSignupModal] = useState(true);

  useEffect(() => {
    // Show signup modal if signIn query param is not present (default to signup)
    const signIn = searchParams?.get("signIn");
    if (signIn) {
      setShowSignupModal(false);
    }
  }, [searchParams]);

  return (
    <SignupModal
      isOpen={showSignupModal}
      onClose={() => router.push("/browse")}
    />
  );
}

