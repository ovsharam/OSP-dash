/**
 * shipping.js
 * 
 * Handles Echo shipping quote API integration
 * Called from ShippingQuote component
 */

(function() {
  'use strict';

  // Configuration (can be overridden by window.ECHO_SHIP)
  const CONFIG = window.ECHO_SHIP || {
    MAP_URL: "/freight-map.json",
    QUOTE_URL: "https://echo-ship.onrender.com/cart-echo-quote",
    CHECKOUT_URL: "/checkout",
    STEP_CENTS: 1000,     // $10 steps
    MAX_CENTS: 60000,     // $600 max
    MIN_LBS: 150,
    QUOTE_TIMEOUT_MS: 180000
  };

  /**
   * Get freight quote from Echo API
   */
  function getFreightQuote(payload, callback) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.QUOTE_TIMEOUT_MS);

    fetch(CONFIG.QUOTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error('Failed to get quote');
      }
      return response.json();
    })
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        callback(new Error('Request timeout'));
      } else {
        callback(error);
      }
    });
  }

  /**
   * Format quote results for display
   */
  function formatQuoteResults(quotes) {
    if (!quotes || !Array.isArray(quotes)) {
      return '<p class="text-red-600">No quotes available</p>';
    }

    let html = '<div class="space-y-2 mt-4"><h4 class="font-semibold mb-2">Available Quotes:</h4>';
    
    quotes.forEach((quote, index) => {
      const quoteId = quote.id || `quote-${index}`;
      const price = quote.price ? `$${quote.price.toFixed(2)}` : 'N/A';
      const days = quote.estimated_days || quote.estimatedDays || 'N/A';
      const carrier = quote.carrier || 'Carrier';
      
      html += `
        <label class="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="shipping-quote"
            value="${quoteId}"
            class="w-4 h-4"
          />
          <div class="flex-1">
            <div class="font-medium">${carrier}</div>
            <div class="text-xs text-gray-600">${price} • ${days} days</div>
          </div>
        </label>
      `;
    });
    
    html += '</div>';
    return html;
  }

  // Expose functions globally for use by ShippingQuote component
  window.OSP_SHIPPING = {
    getFreightQuote: getFreightQuote,
    formatQuoteResults: formatQuoteResults,
    CONFIG: CONFIG
  };

})();

