"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { SellerProfile } from "@/types";

export default function VendorSignupPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState<"account" | "business">("account");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Account & Contact Info
  const [accountInfo, setAccountInfo] = useState({
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Business Information
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessType: "",
    businessWebsite: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  });

  const validateAccountStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (!accountInfo.email) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!accountInfo.password) {
      newErrors.password = "Password is required";
    } else if (accountInfo.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (accountInfo.password !== accountInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!accountInfo.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!accountInfo.lastName) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBusinessStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (!businessInfo.businessName) {
      newErrors.businessName = "Business name is required";
    }

    if (!businessInfo.businessType) {
      newErrors.businessType = "Business type is required";
    }

    if (!businessInfo.address.street) {
      newErrors.street = "Street address is required";
    }

    if (!businessInfo.address.city) {
      newErrors.city = "City is required";
    }

    if (!businessInfo.address.state) {
      newErrors.state = "State/Province is required";
    }

    if (!businessInfo.address.zipCode) {
      newErrors.zipCode = "Postal/ZIP code is required";
    }

    if (!businessInfo.address.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAccountStep()) {
      setStep("business");
    }
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBusinessStep()) {
      // Create seller profile
      const sellerProfile: SellerProfile = {
        id: `seller-${Date.now()}`,
        email: accountInfo.email,
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        phone: accountInfo.phone || undefined,
        businessName: businessInfo.businessName,
        businessType: businessInfo.businessType,
        businessWebsite: businessInfo.businessWebsite || undefined,
        businessAddress: businessInfo.address,
        createdAt: new Date(),
        isActive: true,
      };

      // Update user with seller profile
      updateUser({
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        phone: accountInfo.phone || undefined,
        sellerProfile,
      });

      // Redirect to vendor dashboard
      router.push("/vendor/dashboard");
    }
  };

  const businessTypes = [
    "Retail Store",
    "Online Shop",
    "Boutique",
    "Restaurant/Cafe",
    "Grocery Store",
    "Specialty Store",
    "Marketplace Seller",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Create Seller Profile</h1>
          <p className="text-gray-600">Start selling on OSP Marketplace</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === "account"
                    ? "bg-black text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {step === "account" ? "1" : "✓"}
              </div>
              <div className={`w-24 h-1 ${step === "business" ? "bg-green-500" : "bg-gray-300"}`}></div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === "business"
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step === "account" ? "font-semibold text-black" : "text-gray-500"}>
              Account Info
            </span>
            <span className={step === "business" ? "font-semibold text-black" : "text-gray-500"}>
              Business Info
            </span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {step === "account" ? (
            <form onSubmit={handleAccountSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-black mb-4">Account & Contact Info</h2>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={accountInfo.email}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, email: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={accountInfo.password}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, password: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="At least 8 characters"
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={accountInfo.confirmPassword}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={accountInfo.firstName}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, firstName: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={accountInfo.lastName}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, lastName: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={accountInfo.phone}
                  onChange={(e) =>
                    setAccountInfo({ ...accountInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue to Business Information
              </button>
            </form>
          ) : (
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-black mb-4">🏬 Business Information</h2>

              {/* Business Name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business name / Store name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={businessInfo.businessName}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, businessName: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="My Store"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label
                  htmlFor="businessType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business type <span className="text-red-500">*</span>
                </label>
                <select
                  id="businessType"
                  value={businessInfo.businessType}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, businessType: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.businessType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select business type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>
                )}
              </div>

              {/* Business Website */}
              <div>
                <label
                  htmlFor="businessWebsite"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Business website or online store URL{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  id="businessWebsite"
                  value={businessInfo.businessWebsite}
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, businessWebsite: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://www.mystore.com"
                />
              </div>

              {/* Business Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Business Address</h3>

                {/* Street */}
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={businessInfo.address.street}
                    onChange={(e) =>
                      setBusinessInfo({
                        ...businessInfo,
                        address: { ...businessInfo.address, street: e.target.value },
                      })
                    }
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.street ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={businessInfo.address.city}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          address: { ...businessInfo.address, city: e.target.value },
                        })
                      }
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={businessInfo.address.state}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          address: { ...businessInfo.address, state: e.target.value },
                        })
                      }
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                  </div>
                </div>

                {/* ZIP and Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Postal/ZIP code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      value={businessInfo.address.zipCode}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          address: { ...businessInfo.address, zipCode: e.target.value },
                        })
                      }
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={businessInfo.address.country}
                      onChange={(e) =>
                        setBusinessInfo({
                          ...businessInfo,
                          address: { ...businessInfo.address, country: e.target.value },
                        })
                      }
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="United States"
                    />
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep("account")}
                  className="flex-1 bg-gray-200 text-black py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                  Create Seller Profile
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have a seller profile?{" "}
            <Link href="/vendor/login" className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

