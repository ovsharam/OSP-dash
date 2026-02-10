"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface ShippingSpecs {
  height_in?: number;
  width_in?: number;
  depth_in?: number;
  weight_lbs?: number;
}

interface ShippingQuoteProps {
  onQuoteSelected?: (quote: any) => void;
}

export default function ShippingQuote({ onQuoteSelected }: ShippingQuoteProps) {
  const router = useRouter();
  const { items } = useCart();
  const [destZip, setDestZip] = useState("");
  const [originType, setOriginType] = useState("BUSINESS");
  const [destType, setDestType] = useState("RESIDENTIAL");
  const [liftgate, setLiftgate] = useState(false);
  const [freightClass, setFreightClass] = useState("70");
  const [quoteResults, setQuoteResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

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

  // Update shipping calculations from cart items
  const updateShippingFromItems = useCallback(() => {
    if (!items.length) return;

    let totalWeightLbs = 0;
    let firstSpecs: ShippingSpecs | null = null;
    let firstItemForDims: typeof items[0] | null = null;
    const itemBreakdown: string[] = [];

    for (const item of items) {
      // Try dimensions first, then fall back to parsing description
      let specs: ShippingSpecs = {};

      if (item.product.dimensions) {
        specs = {
          height_in: item.product.dimensions.height,
          width_in: item.product.dimensions.width,
          depth_in: item.product.dimensions.length,
          weight_lbs: item.product.dimensions.weight,
        };
      } else {
        specs = parseShippingSpecsFromDescription(item.product.description || "");
      }

      const qty = item.quantity || 1;

      if (specs.weight_lbs) {
        totalWeightLbs += specs.weight_lbs * qty;
      }

      if (specs.weight_lbs) {
        itemBreakdown.push(`${item.product.name} – ${specs.weight_lbs} lb × ${qty}`);
      } else {
        itemBreakdown.push(`${item.product.name} – weight not found × ${qty}`);
      }

      if (!firstSpecs && (specs.height_in || specs.width_in || specs.depth_in)) {
        firstSpecs = specs;
        firstItemForDims = item;
      }
    }

    // Update hidden fields (for API payload)
    const weightInput = document.getElementById("weight-lbs") as HTMLInputElement;
    const lenInput = document.getElementById("ship-length-in") as HTMLInputElement;
    const widInput = document.getElementById("ship-width-in") as HTMLInputElement;
    const htInput = document.getElementById("ship-height-in") as HTMLInputElement;

    if (weightInput) {
      weightInput.value = totalWeightLbs > 0 ? totalWeightLbs.toString() : "";
    }

    if (firstSpecs) {
      if (htInput && firstSpecs.height_in) htInput.value = firstSpecs.height_in.toString();
      if (widInput && firstSpecs.width_in) widInput.value = firstSpecs.width_in.toString();
      if (lenInput && firstSpecs.depth_in) lenInput.value = firstSpecs.depth_in.toString();
    } else {
      if (htInput) htInput.value = "";
      if (widInput) widInput.value = "";
      if (lenInput) lenInput.value = "";
    }

    // Update UI summaries
    const weightSummary = document.getElementById("weight-summary");
    const weightBreakdown = document.getElementById("weight-breakdown");
    const dimsSummary = document.getElementById("dims-summary");
    const cartCountSpan = document.getElementById("sq-cart-count");

    const productCount = items.length;
    const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 1), 0);

    if (weightSummary) {
      if (totalWeightLbs > 0) {
        if (productCount > 1) {
          weightSummary.textContent = `${totalWeightLbs} lb total (${productCount} products, ${totalQuantity} units)`;
        } else {
          weightSummary.textContent = `${totalWeightLbs} lb`;
        }
      } else {
        weightSummary.textContent = productCount > 1
          ? `${productCount} products (weight not found)`
          : "Weight not found in specs";
      }
    }

    if (weightBreakdown) {
      if (productCount > 1 && itemBreakdown.length) {
        weightBreakdown.textContent = itemBreakdown.join(" · ");
      } else {
        weightBreakdown.textContent = "";
      }
    }

    if (dimsSummary) {
      if (firstSpecs && firstSpecs.height_in && firstSpecs.width_in && firstSpecs.depth_in) {
        const labelPrefix = productCount > 1 && firstItemForDims
          ? `${firstItemForDims.product.name} (example): `
          : "";

        dimsSummary.textContent =
          `${labelPrefix}${firstSpecs.height_in}" H × ${firstSpecs.width_in}" W × ${firstSpecs.depth_in}" D`;
      } else if (productCount > 1) {
        dimsSummary.textContent = "Multiple products – dimensions vary by item";
      } else {
        dimsSummary.textContent = "Dimensions not found in specs";
      }
    }

    if (cartCountSpan) {
      cartCountSpan.textContent = `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""}`;
    }

    // Origin ZIP – set default
    const originZipInput = document.getElementById("origin-zip") as HTMLInputElement;
    if (originZipInput) {
      originZipInput.value = "78219";
      const originSummary = document.getElementById("origin-summary");
      if (originSummary) {
        originSummary.textContent = "Lancer Worldwide, San Antonio, TX 78219, United States";
      }
    }
  }, [items, parseShippingSpecsFromDescription]);

  useEffect(() => {
    updateShippingFromItems();
  }, [updateShippingFromItems]);

  // Helper to convert lbs to grams
  const lbsToGrams = (lbs: number) => {
    return lbs > 0 ? lbs * 453.59237 : 0;
  };

  const handleGetQuote = async () => {
    if (!destZip.trim()) {
      alert("Please enter a destination ZIP code");
      return;
    }

    setLoading(true);
    setQuoteResults(null);
    setSelectedQuote(null);

    try {
      const weightInput = document.getElementById("weight-lbs") as HTMLInputElement;
      const originZipInput = document.getElementById("origin-zip") as HTMLInputElement;

      const totalLbs = Math.max(1, Math.round(parseFloat(weightInput?.value || "0")));
      const totalGrams = Math.round(lbsToGrams(totalLbs));

      // Match Shopify payload structure
      const payload = {
        originPostal: originZipInput?.value || "78219",
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
          .sort((a: any, b: any) => a.amount - b.amount);

        if (options.length > 0) {
          setQuoteResults({ options });
          // Auto-select first (cheapest) option
          setSelectedQuote(`option-0`);
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
        return;
      }

      // No valid quote
      setQuoteResults({ error: "No live rates for this lane." });
    } catch (error) {
      console.error("Error getting shipping quote:", error);
      setQuoteResults({ error: error instanceof Error ? error.message : "Failed to get shipping quote. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteSelect = (quoteId: string) => {
    setSelectedQuote(quoteId);
    if (onQuoteSelected && quoteResults && quoteResults.options) {
      // Extract index from quoteId (format: "option-0", "option-1", etc.)
      const index = parseInt(quoteId.replace("option-", ""), 10);
      if (!isNaN(index) && quoteResults.options[index]) {
        onQuoteSelected(quoteResults.options[index]);
      }
    }
  };

  const activateCheckoutButton = () => {
    const btn = document.getElementById("btn-continue") as HTMLButtonElement;
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("sq-btn-secondary");
      btn.classList.add("sq-btn-primary");
      btn.style.cursor = "pointer";
    }
  };

  useEffect(() => {
    if (selectedQuote) {
      activateCheckoutButton();
    }
  }, [selectedQuote]);

  const totalQuantity = items.reduce((acc, it) => acc + (it.quantity || 1), 0);

  return (
    <div id="shipping-quote-wrapper" className="max-w-[880px] mx-auto my-8 px-4">
      <section id="shipping-quote" className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 sm:p-6">
        <header id="shipping-quote-header" className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
          <div>
            <h2 className="text-xl font-semibold mb-1 tracking-tight">Freight Shipping (LTL)</h2>
            <p id="shipping-quote-subtitle" className="text-sm text-gray-600 m-0">
              We'll use your cart and product details to calculate a live freight quote. You only need to tell us where it's going.
            </p>
          </div>
          <div className="sq-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-xs text-gray-600 whitespace-nowrap">
            <small className="text-[10px] uppercase tracking-wider text-gray-500">Cart</small>
            <span id="sq-cart-count">{totalQuantity} item{totalQuantity !== 1 ? "s" : ""}</span>
          </div>
        </header>

        {/* Stepper */}
        <ol className="sq-steps flex flex-wrap gap-1.5 my-1.5 mb-4.5 p-0 list-none">
          <li className="sq-step inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-xs text-gray-600">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[10px] font-semibold">1</span>
            Enter delivery ZIP
          </li>
          <li className="sq-step inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-xs text-gray-600">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[10px] font-semibold">2</span>
            We auto-fill shipment details
          </li>
          <li className="sq-step inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 text-xs text-gray-600">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[10px] font-semibold">3</span>
            Pick a quote & checkout
          </li>
        </ol>

        <div className="sq-grid grid grid-cols-1 md:grid-cols-[1.4fr_1.1fr] gap-4.5">
          {/* LEFT: Location + auto shipment details */}
          <div>
            <div className="sq-card rounded-xl border border-gray-100 p-3.5 bg-gray-50">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5 m-0">
                Delivery location <span className="sq-label-pill text-[10px] uppercase tracking-wider text-gray-500">Step 1</span>
              </h3>
              <div className="sq-field mb-2.5">
                <label htmlFor="dest-zip" className="block text-xs font-medium mb-1 text-gray-800">
                  Destination ZIP <span className="required text-red-600">*</span>
                </label>
                <input
                  id="dest-zip"
                  type="text"
                  placeholder="e.g., 90001"
                  value={destZip}
                  onChange={(e) => setDestZip(e.target.value)}
                  className="w-full px-2.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5"
                />
                <small className="sq-help block mt-0.75 text-gray-600 text-xs">
                  Use the ZIP code where this machine will be delivered.
                </small>
              </div>
            </div>

            <div className="sq-card rounded-xl border border-gray-100 p-3.5 bg-gray-50 mt-2.5">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5 m-0">
                Shipment details <span className="sq-label-pill text-[10px] uppercase tracking-wider text-gray-500">Auto-filled</span>
              </h3>

              <div className="sq-meta-row grid grid-cols-[1.2fr_1fr] gap-2 text-xs text-gray-600 mb-1.5">
                <div className="flex flex-col gap-0.5">
                  <strong className="font-semibold">Ships from</strong>
                  <span id="origin-summary" className="text-gray-800">
                    (Will be set automatically based on the product's ship-from location.)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <strong className="font-semibold">Shipping weight</strong>
                  <span id="weight-summary" className="text-gray-800">Calculating…</span>
                  <span id="weight-breakdown" className="sq-help text-xs text-gray-600"></span>
                </div>
              </div>

              <div className="sq-meta-row grid grid-cols-[1.2fr_1fr] gap-2 text-xs text-gray-600 mt-1.5">
                <div className="flex flex-col gap-0.5">
                  <strong className="font-semibold">Approx. unit size</strong>
                  <span id="dims-summary" className="text-gray-800">Calculating…</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <strong className="font-semibold">Freight class</strong>
                  <span>Default: 70 (standard palletized goods)</span>
                </div>
              </div>

              <p className="sq-meta-footnote mt-1.5 text-xs text-gray-500 mb-0">
                These details are parsed from your product specifications and may vary based on what's in your cart.
              </p>
            </div>
          </div>

          {/* RIGHT: Advanced delivery/accessorial options */}
          <div>
            <details className="sq-accordion rounded-xl border border-gray-100 bg-gray-50 p-0 overflow-hidden" open>
              <summary className="list-none cursor-pointer px-3 py-2.5 flex items-center justify-between text-xs font-medium">
                Delivery details & accessorials
                <span className="sq-accordion-icon text-sm opacity-60 transform translate-y-px">⌄</span>
              </summary>
              <div className="sq-accordion-body px-3 py-2 border-t border-gray-100">
                <div className="sq-field mb-2.5">
                  <label htmlFor="origin-type" className="block text-xs font-medium mb-1 text-gray-800">
                    Origin type
                  </label>
                  <select
                    id="origin-type"
                    value={originType}
                    onChange={(e) => setOriginType(e.target.value)}
                    className="w-full px-2.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5"
                  >
                    <option value="BUSINESS">Business / warehouse</option>
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="CONSTRUCTIONSITE">Construction site</option>
                    <option value="TRADESHOW">Trade show / event</option>
                  </select>
                  <small className="sq-help block mt-0.75 text-gray-600 text-xs">
                    This describes where the freight is picked up.
                  </small>
                </div>

                <div className="sq-field mb-2.5">
                  <label htmlFor="dest-type" className="block text-xs font-medium mb-1 text-gray-800">
                    Destination type
                  </label>
                  <select
                    id="dest-type"
                    value={destType}
                    onChange={(e) => setDestType(e.target.value)}
                    className="w-full px-2.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black/5"
                  >
                    <option value="BUSINESS">Business with dock/forklift</option>
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="CONSTRUCTIONSITE">Construction site</option>
                    <option value="TRADESHOW">Trade show / event</option>
                  </select>
                  <small className="sq-help block mt-0.75 text-gray-600 text-xs">
                    Carriers use this to calculate any extra delivery fees.
                  </small>
                </div>

                <div className="sq-toggle-row flex gap-2 items-center mt-2 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      id="liftgate"
                      type="checkbox"
                      checked={liftgate}
                      onChange={(e) => setLiftgate(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Liftgate needed at delivery
                  </label>
                  <small className="text-xs text-gray-600">
                    Select if there's no loading dock or forklift at the delivery location.
                  </small>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Hidden fields for API payload */}
        <input id="origin-zip" type="hidden" value="78219" />
        <input id="weight-lbs" type="hidden" value="" />
        <input id="ship-length-in" type="hidden" value="" />
        <input id="ship-width-in" type="hidden" value="" />
        <input id="ship-height-in" type="hidden" value="" />
        <select id="freight-class" className="hidden" value={freightClass} onChange={(e) => setFreightClass(e.target.value)}>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="60">60</option>
          <option value="65">65</option>
          <option value="70">70</option>
          <option value="77.5">77.5</option>
          <option value="85">85</option>
          <option value="92.5">92.5</option>
          <option value="100">100</option>
          <option value="110">110</option>
          <option value="125">125</option>
          <option value="150">150</option>
          <option value="175">175</option>
          <option value="200">200</option>
          <option value="250">250</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
        </select>

        {/* ACTIONS */}
        <div className="sq-actions flex flex-wrap gap-2 items-center mt-4.5">
          <button
            id="btn-get-quote"
            type="button"
            onClick={handleGetQuote}
            disabled={loading || !destZip.trim()}
            className="sq-btn-primary px-4 py-2.5 rounded-full border-0 text-sm cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap transition-all bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            {loading ? "Getting quote..." : "Get freight quote"}
          </button>

          <button
            id="btn-continue"
            type="button"
            disabled={!selectedQuote}
            onClick={() => {
              if (selectedQuote) {
                router.push("/checkout");
              }
            }}
            className="sq-btn-secondary px-4 py-2.5 rounded-full border-0 text-sm cursor-not-allowed inline-flex items-center gap-1.5 whitespace-nowrap transition-all bg-gray-100 text-gray-600 disabled:opacity-50"
          >
            Continue to checkout
          </button>

          <span id="quote-status" className="sq-status-text text-xs text-gray-600">
            {selectedQuote ? "Quote selected. Ready to checkout." : "You'll be able to continue after selecting a quote."}
          </span>
        </div>

        {/* Quote Results */}
        <div id="quote-results" className="mt-2.5 text-sm text-gray-800">
          {quoteResults && quoteResults.options && quoteResults.options.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold mb-2">Available Quotes:</h4>
              {quoteResults.options.map((quote: any, index: number) => {
                const quoteId = `option-${index}`;
                // Amount is in cents, convert to dollars
                const price = quote.amount ? (quote.amount / 100).toFixed(2) : "0.00";
                const carrier = quote.carrier || "Echo";
                const service = quote.service || "";
                const etaMin = quote.etaMin;
                const etaMax = quote.etaMax;

                return (
                  <label
                    key={quoteId}
                    className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="shipping-quote"
                      value={quoteId}
                      checked={selectedQuote === quoteId}
                      onChange={(e) => handleQuoteSelect(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">${price} via {carrier} {service}</div>
                      {(etaMin || etaMax) && (
                        <div className="text-xs text-gray-600">
                          Est. {etaMin || ""}{etaMax ? (etaMin ? " – " : "") + etaMax : ""} days
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
              <p className="text-xs text-gray-500 mt-2">
                Freight will be added as a line item at checkout.
              </p>
            </div>
          )}
          {quoteResults && quoteResults.error && (
            <div className="mt-4 text-gray-700 text-sm">
              {quoteResults.error}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

