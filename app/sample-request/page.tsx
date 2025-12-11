"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SampleRequestPage() {
  const router = useRouter();
  const { isAuthenticated, user, signup, login, updateUser } = useAuth();
  const [step, setStep] = useState<"auth" | "form" | "contract">(
    isAuthenticated ? (user?.contractSigned ? "form" : "contract") : "auth"
  );
  const [isLogin, setIsLogin] = useState(true);

  // Auth form state
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authBusinessName, setAuthBusinessName] = useState("");

  // Business form state
  const [businessForm, setBusinessForm] = useState({
    businessName: user?.businessName || "",
    businessType: "",
    taxId: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
  });

  // Contract state
  const [contractAccepted, setContractAccepted] = useState(user?.contractSigned || false);
  const [termsRead, setTermsRead] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login(authEmail, authPassword);
      setStep("contract");
    } else {
      await signup(authEmail, authPassword, authName, authBusinessName);
      setStep("contract");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      businessName: businessForm.businessName,
      address: businessForm.address,
    });
    setStep("contract");
  };

  const handleContractAccept = () => {
    if (termsRead) {
      updateUser({ contractSigned: true });
      router.push("/browse");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-black mb-2">Request a Sample</h1>
          <p className="text-gray-600 mb-8">
            To request samples, please complete the authentication and business verification process.
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === "auth" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Authentication</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === "form" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Business Info</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step === "contract" ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Contract</span>
            </div>
          </div>

          {/* Step 1: Authentication */}
          {step === "auth" && (
            <div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 rounded font-medium ${
                    isLogin
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 rounded font-medium ${
                    !isLogin
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={authBusinessName}
                        onChange={(e) => setAuthBusinessName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessForm.businessName}
                  onChange={(e) =>
                    setBusinessForm({ ...businessForm, businessName: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type *
                </label>
                <select
                  value={businessForm.businessType}
                  onChange={(e) =>
                    setBusinessForm({ ...businessForm, businessType: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                >
                  <option value="">Select business type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail Store</option>
                  <option value="hotel">Hotel</option>
                  <option value="cafe">Cafe</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / EIN</label>
                <input
                  type="text"
                  value={businessForm.taxId}
                  onChange={(e) => setBusinessForm({ ...businessForm, taxId: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={businessForm.phone}
                  onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address *
                </label>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={businessForm.address.street}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      address: { ...businessForm.address, street: e.target.value },
                    })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={businessForm.address.city}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        address: { ...businessForm.address, city: e.target.value },
                      })
                    }
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={businessForm.address.state}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        address: { ...businessForm.address, state: e.target.value },
                      })
                    }
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={businessForm.address.zipCode}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        address: { ...businessForm.address, zipCode: e.target.value },
                      })
                    }
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={businessForm.address.country}
                    onChange={(e) =>
                      setBusinessForm({
                        ...businessForm,
                        address: { ...businessForm.address, country: e.target.value },
                      })
                    }
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue to Contract
              </button>
            </form>
          )}

          {/* Step 3: Contract */}
          {step === "contract" && (
            <div>
              <div className="border border-gray-200 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                <h2 className="text-xl font-bold text-black mb-4">Sample Request Agreement</h2>
                <div className="text-sm text-gray-700 space-y-4">
                  <p>
                    <strong>1. Sample Request Terms</strong>
                    <br />
                    By requesting a sample, you agree to evaluate the product for potential wholesale
                    purchase. Samples are provided at a discounted rate or may be free depending on
                    vendor policies.
                  </p>
                  <p>
                    <strong>2. Business Verification</strong>
                    <br />
                    You certify that you are a legitimate business entity and will use the samples
                    for business evaluation purposes only.
                  </p>
                  <p>
                    <strong>3. Purchase Commitment</strong>
                    <br />
                    While there is no obligation to purchase, we expect that samples will be used to
                    make informed purchasing decisions for your business.
                  </p>
                  <p>
                    <strong>4. Return Policy</strong>
                    <br />
                    Samples may be returned within 30 days if they do not meet your requirements.
                    Return shipping costs are the responsibility of the requester unless otherwise
                    specified.
                  </p>
                  <p>
                    <strong>5. Confidentiality</strong>
                    <br />
                    Product information and pricing are confidential and should not be shared with
                    competitors or unauthorized parties.
                  </p>
                </div>
              </div>
              <label className="flex items-start mb-6">
                <input
                  type="checkbox"
                  checked={termsRead}
                  onChange={(e) => setTermsRead(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the Sample Request Agreement terms and conditions *
                </span>
              </label>
              <button
                onClick={handleContractAccept}
                disabled={!termsRead}
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Accept and Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

