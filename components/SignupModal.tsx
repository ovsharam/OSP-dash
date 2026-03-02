"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useSignupModal } from "@/contexts/SignupModalContext";

interface SignupModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SignupModal({ isOpen: propIsOpen, onClose: propOnClose }: SignupModalProps) {
  let modalContext: { isOpen: boolean; closeModal: () => void } | null = null;
  try {
    modalContext = useSignupModal();
  } catch {
    // Context not available, use props
  }
  const isOpen = propIsOpen !== undefined ? propIsOpen : (modalContext?.isOpen ?? false);
  const onClose = propOnClose ?? modalContext?.closeModal ?? (() => {});
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Generate a temporary password for signup
    const tempPassword = `temp_${Date.now()}`;
    await signup(email, tempPassword, "", "");
    setIsLoading(false);
    onClose();
    router.push("/browse");
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
    alert("Google signup coming soon!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-8 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div
          className="f_flex_base f_flex_single_value_flex_grow f_flex_single_value_flex_shrink f_flex_single_value_flex_basis f_flex_single_value_align f_flex_single_value_direction"
          style={{
            "--f_flex_flex_grow": 1,
            "--f_flex_flex_shrink": 1,
            "--f_flex_flex_basis": "0%",
            "--f_flex_align_mobile": "center",
            "--f_flex_direction_mobile": "column",
          } as React.CSSProperties}
        >
          {/* Logo */}
          <img
            width="104"
            alt="OSP Logo"
            src="https://cdn.faire.com/static/logo.svg"
            className="mx-auto"
            onError={(e) => {
              // Fallback if logo doesn't load
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
            style={{ "--f_spacer_size_mobile": "16px", width: "0px" } as React.CSSProperties}
          ></div>

          {/* Heading */}
          <h4
            className="f_t_base f_t_color f_t_single_value_text_align f_t_displaySSerifRegular"
            style={{
              "--f_t_text_align_mobile": "center",
              "--f_t_color": "#333333",
              "--f_t_decorationColor": "#757575",
            } as React.CSSProperties}
          >
            Unlock wholesale pricing
          </h4>
          <div
            className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
            style={{ "--f_spacer_size_mobile": "8px", width: "0px" } as React.CSSProperties}
          ></div>
          <div
            className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
            style={{ "--f_spacer_size_mobile": "16px", width: "0px" } as React.CSSProperties}
          ></div>

          {/* Email Input */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="fslegacy-component w-full">
              <label
                id="input-email-label"
                htmlFor="input-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business email
              </label>
              <div
                role="button"
                className="f_flex_base f_flex_single_value_align f_flex_single_value_direction"
                style={{
                  "--f_flex_align_mobile": "center",
                  "--f_flex_direction_mobile": "row",
                } as React.CSSProperties}
              >
                <input
                  placeholder=""
                  autoComplete="email"
                  data-test-id="email"
                  aria-labelledby="input-email-label"
                  id="input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
            </div>
            <div
              className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width f_spacer_single_value_min_height"
              style={{ "--f_spacer_size_mobile": "16px" } as React.CSSProperties}
            ></div>

            {/* Buy wholesale now button */}
            <button
              data-test-id="createAccountButton"
              type="submit"
              disabled={isLoading}
              className="fslegacy-component w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              aria-disabled={isLoading}
            >
              Buy wholesale now
            </button>
          </form>

          {/* Or separator */}
          <div
            className="f_flex_base f_flex_single_value_direction w-full"
            style={{ "--f_flex_direction_mobile": "column", width: "100%" } as React.CSSProperties}
          >
            <div
              className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
              style={{ "--f_spacer_size_mobile": "16px", width: "0px" } as React.CSSProperties}
            ></div>
            <div
              className="f_flex_base f_flex_single_value_align f_flex_single_value_direction"
              style={{
                "--f_flex_align_mobile": "center",
                "--f_flex_direction_mobile": "row",
              } as React.CSSProperties}
            >
              <hr
                style={{
                  borderBlockEnd: "0px",
                  borderInline: "0px",
                  inlineSize: "100%",
                  margin: "0px",
                  blockSize: "1px",
                  borderBlockStart: "1px solid rgb(223, 224, 225)",
                }}
              />
              <div
                className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width"
                style={{ "--f_spacer_size_mobile": "16px", height: "0px" } as React.CSSProperties}
              ></div>
              <p
                className="f_t_base f_t_color f_t_paragraphSansRegular"
                style={{
                  "--f_t_color": "#333333",
                  "--f_t_decorationColor": "#757575",
                } as React.CSSProperties}
              >
                or
              </p>
              <div
                className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width"
                style={{ "--f_spacer_size_mobile": "16px", height: "0px" } as React.CSSProperties}
              ></div>
              <hr
                style={{
                  borderBlockEnd: "0px",
                  borderInline: "0px",
                  inlineSize: "100%",
                  margin: "0px",
                  blockSize: "1px",
                  borderBlockStart: "1px solid rgb(223, 224, 225)",
                }}
              />
            </div>
            <div
              className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
              style={{ "--f_spacer_size_mobile": "16px", width: "0px" } as React.CSSProperties}
            ></div>

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              className="fslegacy-component w-full border border-gray-300 rounded px-4 py-3 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-disabled={false}
            >
              <svg
                className="svgicon"
                focusable="false"
                viewBox="0 0 20 20"
                aria-labelledby="titleAccess-google"
                role="img"
                style={{
                  "--f-svg-fill": "none",
                  "--f-svg-font-size": "20px",
                  width: "20px",
                  height: "20px",
                } as React.CSSProperties}
              >
                <path
                  d="M19.788 10.225c0-.658-.059-1.283-.159-1.892h-9.417v3.759h5.392c-.241 1.233-.95 2.275-2 2.983v2.5h3.217c1.883-1.742 2.967-4.308 2.967-7.35"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.213 20c2.7 0 4.958-.9 6.608-2.425l-3.217-2.5c-.9.6-2.041.967-3.391.967-2.609 0-4.817-1.759-5.609-4.134H1.288v2.575C2.929 17.75 6.304 20 10.213 20"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.604 11.908A5.8 5.8 0 0 1 4.287 10c0-.667.117-1.308.317-1.908V5.517H1.287a9.88 9.88 0 0 0 0 8.966z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.213 3.958c1.475 0 2.791.509 3.833 1.5l2.85-2.85C15.17.992 12.912 0 10.213 0 6.304 0 2.929 2.25 1.287 5.517l3.316 2.575c.792-2.375 3-4.134 5.609-4.134"
                  fill="#EA4335"
                ></path>
                <title id="titleAccess-google">Google logo</title>
              </svg>
              <div className="f_spacer_grow"></div>
              <span className="text-black">Sign up with Google</span>
              <div className="f_spacer_grow"></div>
              <div
                className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width"
                style={{ "--f_spacer_size_mobile": "24px", height: "0px" } as React.CSSProperties}
              ></div>
            </button>
          </div>

          <div
            className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
            style={{ "--f_spacer_size_mobile": "16px", width: "0px" } as React.CSSProperties}
          ></div>

          {/* Sign in link */}
          <Link
            href="/login"
            className="fs-button interactive focusable fs-button--plain fs-button--medium fs-component text-center"
            onClick={onClose}
          >
            <span className="inline items-start">Sign in</span>
          </Link>

          <div
            className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_height"
            style={{ "--f_spacer_size_mobile": "24px", width: "0px" } as React.CSSProperties}
          ></div>

          {/* Legal Disclaimer */}
          <span
            className="f_t_base f_t_color f_t_single_value_text_align f_t_labelSansRegular text-center block"
            style={{
              "--f_t_text_align_mobile": "center",
              "--f_t_color": "#757575",
              "--f_t_decorationColor": "#757575",
            } as React.CSSProperties}
          >
            By proceeding, you agree to our{" "}
            <Link
              target="_blank"
              href="/tos"
              className="fslegacy-component underline hover:text-black"
              aria-disabled={false}
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              href="/privacy"
              className="fslegacy-component underline hover:text-black"
              aria-disabled={false}
            >
              Privacy Policy
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}

