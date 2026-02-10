"use client";
// Force rebuild


import React, { createContext, useContext, useState } from "react";

interface SignupModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const SignupModalContext = createContext<SignupModalContextType | undefined>(undefined);

export function SignupModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SignupModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </SignupModalContext.Provider>
  );
}

export function useSignupModal() {
  const context = useContext(SignupModalContext);
  if (context === undefined) {
    throw new Error("useSignupModal must be used within a SignupModalProvider");
  }
  return context;
}

