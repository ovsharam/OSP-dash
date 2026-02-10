"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContextNew";
import { Product } from "@/types";

interface ShippingSpecs {
  height_in?: number;
  width_in?: number;
  depth_in?: number;
  weight_lbs?: number;
}

interface FreightShippingQuote {
  amount: number; // in cents
  carrier: string;
  service: string;
  quoteId?: string;
  etaMin?: number;
  etaMax?: number;
}

interface ProductShippingQuoteProps {
  product: Product;
  quantity: number;
  onQuoteSelected?: (quote: FreightShippingQuote | null) => void;
}

export default function ProductShippingQuote({ product, quantity, onQuoteSelected }: ProductShippingQuoteProps) {
  const { user } = useAuth();
  const [destZip, setDestZip] = useState("");
  const [originType, setOriginType] = useState("BUSINESS");
  const [destType, setDestType] = useState("RESIDENTIAL");
  const [liftgate, setLiftgate] = useState(false);
  const [freightClass, setFreightClass] = useState("70");
  const [quoteResults, setQuoteResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const [showQuoteSection, setShowQuoteSection] = useState(false);
  const hasAutoFetchedRef = useRef(false);

  // Parse shipping specs from product description
  const parseShippingSpecsFromDescription = useCallback((desc: string): ShippingSpecs => {
    if (!desc) return {};

    const matchNumber = (regex: RegExp): number | null => {
      const m = desc.match(regex);
      return m ? parseFloat(m[1]) : null;
    };

    const heightIn = matchNumber(/Height:\s*([\d.]+)/i);
    const widthIn = matchNumber(/Width:\s*([\d.]+)/i);
    const depthIn = matchNumber(/Depth:\s*([\d.]+)/i);
    const shipLbs = matchNumber(/Shipping:\s*([\d.]+)/i);

    return {
      height_in: heightIn || undefined,
      width_in: widthIn || undefined,
      depth_in: depthIn || undefined,
      weight_lbs: shipLbs || undefined,
    };
  }, []);

  // Calculate shipping specs for single product
  const calculateProductSpecs = useCallback(() => {
    let specs: ShippingSpecs = {};

    // Try dimensions first, then fall back to parsing description
    if (product.dimensions) {
      specs = {
        height_in: product.dimensions.height,
        width_in: product.dimensions.width,
        depth_in: product.dimensions.length,
        weight_lbs: product.dimensions.weight,
      };
    } else {
      specs = parseShippingSpecsFromDescription(product.description || "");
    }

    // Multiply by quantity
    const totalWeight = specs.weight_lbs ? specs.weight_lbs * quantity : 0;

    return {
      ...specs,
      weight_lbs: totalWeight,
    };
  }, [product, quantity, parseShippingSpecsFromDescription]);

  // Helper to convert lbs to grams
  const lbsToGrams = useCallback((lbs: number) => {
    return lbs > 0 ? lbs * 453.59237 : 0;
  }, []);

  const handleGetQuote = useCallback(async (autoFetch = false) => {
    if (!destZip.trim()) {
      if (!autoFetch) {
        alert("Please enter a destination ZIP code");
      }
      return;
    }

    setLoading(true);
    setQuoteResults(null);
    setSelectedQuote(null);
    setShowQuoteSection(true);

    try {
      const specs = calculateProductSpecs();
      const totalLbs = Math.max(1, Math.round(specs.weight_lbs || 0));
      const totalGrams = Math.round(lbsToGrams(totalLbs));

      // Match Shopify payload structure
      const payload = {
        originPostal: "78219",
        destPostal: destZip.trim(),
        totalLbs: totalLbs,
        totalGrams: totalGrams,
        freightClass: freightClass,
        originType: originType,
        destType: destType,
        accessorials: [
          ...(destType === "RESIDENTIAL" ? ["RESIDENTIAL"] : []),
          ...(liftgate ? ["LIFTGATE_DLV"] : []),
        ],
        currency: "USD",
      };

      const response = await fetch("https://echo-ship.onrender.com/cart-echo-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Failed to get quote: ${response.status} ${errorText}`);
      }

      const raw = await response.text();
      let data = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch (e) {
        throw new Error("Invalid JSON response");
      }

      // Handle response format matching Shopify implementation
      if (data && data.ok === false) {
        setQuoteResults({ error: "Couldn't get a live quote. You can continue; we'll confirm freight after checkout." });
        setSelectedQuote(null);
        if (onQuoteSelected) {
          onQuoteSelected(null);
        }
        return;
      }

      // Handle options array format (new format)
      if (data && Array.isArray(data.options)) {
        const options = data.options
          .map((o: any) => ({
            ...o,
            amount: Number(o.amount),
          }))
          .filter((o: any) => Number.isFinite(o.amount))
          .sort((a: any, b: any) => a.amount - b.amount)
          .slice(0, 2); // Top 2 only

        if (options.length > 0) {
          setQuoteResults({ options });
          // Auto-select first (cheapest) option
          setSelectedQuote(`option-0`);
          // Notify parent of auto-selected quote
          if (onQuoteSelected && options[0]) {
            onQuoteSelected(options[0]);
          }
        } else {
          setQuoteResults({ error: "No live rates for this lane." });
        }
        return;
      }

      // Handle legacy format (hasQuote)
      if (data && data.hasQuote && Number.isFinite(Number(data.amount))) {
        const quote = {
          amount: Number(data.amount),
          carrier: data.carrier || "Echo",
          service: data.service || "",
          quoteId: data.quoteId || "",
        };
        setQuoteResults({ options: [quote] });
        setSelectedQuote("option-0");
        // Notify parent of selected quote
        if (onQuoteSelected) {
          onQuoteSelected(quote);
        }
        return;
      }

      // No valid quote
      setQuoteResults({ error: "No live rates for this lane." });
      if (onQuoteSelected) {
        onQuoteSelected(null);
      }
    } catch (error) {
      console.error("Error getting shipping quote:", error);
      setQuoteResults({ error: error instanceof Error ? error.message : "Failed to get shipping quote. Please try again." });
      if (onQuoteSelected) {
        onQuoteSelected(null);
      }
    } finally {
      setLoading(false);
    }
  }, [destZip, calculateProductSpecs, freightClass, originType, destType, liftgate, lbsToGrams, onQuoteSelected]);

  // Initialize ZIP from user address if available
  useEffect(() => {
    if (user?.address?.zipCode && !destZip) {
      setDestZip(user.address.zipCode);
    }
  }, [user?.address?.zipCode, destZip]);

  // Auto-fetch quote when ZIP is available from user account (only once on mount)
  useEffect(() => {
    // Only auto-fetch if we have a ZIP, no existing results, not loading, ZIP matches user's saved ZIP, and we haven't already auto-fetched
    if (
      user?.address?.zipCode &&
      destZip === user.address.zipCode &&
      !quoteResults &&
      !loading &&
      destZip &&
      !hasAutoFetchedRef.current
    ) {
      hasAutoFetchedRef.current = true;
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        handleGetQuote(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.address?.zipCode, destZip]);

  const specs = calculateProductSpecs();
  const totalWeight = specs.weight_lbs || 0;
  const hasDimensions = specs.height_in && specs.width_in && specs.depth_in;

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
      <h2 className="font-semibold text-black mb-4 text-base">Freight Shipping Estimate</h2>

      <div className="space-y-4">
        {/* ZIP Code Input and Get Quote Button */}
        <div className="space-y-2">
          <label htmlFor="product-dest-zip" className="block text-sm font-medium text-gray-800">
            Delivery ZIP Code <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-2">
            <input
              id="product-dest-zip"
              type="text"
              placeholder="e.g., 90001"
              value={destZip}
              onChange={(e) => setDestZip(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
            />
            <button
              onClick={() => handleGetQuote(false)}
              disabled={loading || !destZip.trim()}
              className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {loading ? "Loading..." : "Get Quote"}
            </button>
          </div>
          {user?.address?.zipCode && destZip === user.address.zipCode && (
            <p className="text-xs text-gray-500">
              Using saved ZIP: {user.address.zipCode}
            </p>
          )}
        </div>

        {/* Advanced Options (Collapsed by default) */}
        <details className="text-xs">
          <summary className="cursor-pointer text-gray-600 hover:text-black py-2 border-t border-gray-200">
            Advanced options
          </summary>
          <div className="mt-3 space-y-3 pt-3">
            <div>
              <label htmlFor="product-origin-type" className="block text-xs font-medium text-gray-800 mb-1">
                Origin type
              </label>
              <select
                id="product-origin-type"
                value={originType}
                onChange={(e) => setOriginType(e.target.value)}
                className="w-full px-2 py-1.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-black"
              >
                <option value="BUSINESS">Business / warehouse</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="CONSTRUCTIONSITE">Construction site</option>
                <option value="TRADESHOW">Trade show / event</option>
              </select>
            </div>
            <div>
              <label htmlFor="product-dest-type" className="block text-xs font-medium text-gray-800 mb-1">
                Destination type
              </label>
              <select
                id="product-dest-type"
                value={destType}
                onChange={(e) => setDestType(e.target.value)}
                className="w-full px-2 py-1.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-black"
              >
                <option value="BUSINESS">Business with dock/forklift</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="CONSTRUCTIONSITE">Construction site</option>
                <option value="TRADESHOW">Trade show / event</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={liftgate}
                onChange={(e) => setLiftgate(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs text-gray-700">Liftgate needed at delivery</span>
            </label>
          </div>
        </details>

        {/* Quote Results - Top 2 Only */}
        {showQuoteSection && quoteResults && quoteResults.options && quoteResults.options.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-black mb-3">Available Shipping Options:</h3>
            <div className="space-y-2.5">
              {quoteResults.options.map((quote: any, index: number) => {
                // Use quoteId if available, otherwise fall back to index-based ID
                const quoteId = quote.quoteId || quote.id || `option-${index}`;
                // Amount is in cents, convert to dollars
                const price = quote.amount ? (quote.amount / 100).toFixed(2) : "0.00";
                const carrier = quote.carrier || "Echo";
                const service = quote.service || "";
                const etaMin = quote.etaMin;
                const etaMax = quote.etaMax;
                const isSelected = selectedQuote === quoteId;

                return (
                  <label
                    key={quoteId}
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                        ? "border-black bg-black/5"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="product-shipping-quote"
                      value={quoteId}
                      checked={isSelected}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setSelectedQuote(selectedId);
                        // Notify parent component of selected quote
                        if (onQuoteSelected && quoteResults?.options) {
                          const selectedIndex = parseInt(selectedId.replace("option-", ""), 10);
                          const selectedQuoteData = !isNaN(selectedIndex) && quoteResults.options[selectedIndex]
                            ? quoteResults.options[selectedIndex]
                            : quoteResults.options.find((q: any) => (q.quoteId || q.id || `option-${quoteResults.options.indexOf(q)}`) === selectedId);
                          if (selectedQuoteData) {
                            onQuoteSelected(selectedQuoteData);
                          }
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black">
                        ${price} via {carrier} {service}
                      </div>
                      {(etaMin || etaMax) && (
                        <div className="text-xs text-gray-600 mt-0.5">
                          Est. {etaMin || ""}{etaMax ? (etaMin ? " – " : "") + etaMax : ""} days
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <div className="text-xs font-medium text-black">Selected</div>
                    )}
                  </label>
                );
              })}
            </div>
            {selectedQuote && (
              <p className="text-xs text-green-600 mt-3 font-medium">
                ✓ Shipping quote selected. This will be applied at checkout.
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Freight will be added as a line item at checkout.
            </p>
          </div>
        )}

        {showQuoteSection && quoteResults && quoteResults.error && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              {quoteResults.error}
            </p>
          </div>
        )}

        {!showQuoteSection && !quoteResults && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Enter your ZIP code above to see estimated freight shipping costs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

