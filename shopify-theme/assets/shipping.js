/**
 * shipping.js
 * 
 * Handles Echo shipping API integration for freight quotes.
 * This file is loaded by shipping-quote.liquid section.
 */

(function() {
  'use strict';

  if (!window.ECHO_SHIP) {
    console.error('[shipping.js] ECHO_SHIP config not found');
    return;
  }

  var config = window.ECHO_SHIP;
  var quoteTimeout = null;
  var selectedQuote = null;

  /**
   * Get quote button handler
   */
  function initGetQuoteButton() {
    var btn = document.getElementById('btn-get-quote');
    if (!btn) return;

    btn.addEventListener('click', function() {
      var destZip = document.getElementById('dest-zip');
      if (!destZip || !destZip.value.trim()) {
        alert('Please enter a destination ZIP code');
        destZip.focus();
        return;
      }

      getQuote();
    });
  }

  /**
   * Continue to checkout button handler
   */
  function initContinueButton() {
    var btn = document.getElementById('btn-continue');
    if (!btn) return;

    btn.addEventListener('click', function() {
      if (btn.disabled) return;
      
      if (!selectedQuote) {
        alert('Please select a shipping quote first');
        return;
      }

      // Add shipping method to cart and redirect to checkout
      addShippingToCartAndCheckout(selectedQuote);
    });
  }

  /**
   * Fetch freight quote from Echo API
   */
  function getQuote() {
    var destZip = document.getElementById('dest-zip');
    var originZip = document.getElementById('origin-zip');
    var weightLbs = document.getElementById('weight-lbs');
    var shipLength = document.getElementById('ship-length-in');
    var shipWidth = document.getElementById('ship-width-in');
    var shipHeight = document.getElementById('ship-height-in');
    var freightClass = document.getElementById('freight-class');
    var originType = document.getElementById('origin-type');
    var destType = document.getElementById('dest-type');
    var liftgate = document.getElementById('liftgate');

    if (!destZip || !destZip.value.trim()) {
      alert('Please enter a destination ZIP code');
      return;
    }

    if (!weightLbs || !weightLbs.value || parseFloat(weightLbs.value) < config.MIN_LBS) {
      alert('Cart weight must be at least ' + config.MIN_LBS + ' lbs for freight shipping');
      return;
    }

    var btn = document.getElementById('btn-get-quote');
    var status = document.getElementById('quote-status');
    var results = document.getElementById('quote-results');

    // Disable button and show loading
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Getting quote...';
    }

    if (status) {
      status.textContent = 'Fetching freight quotes...';
    }

    if (results) {
      results.innerHTML = '<p style="color:#666;">Loading quotes...</p>';
    }

    // Build payload
    var payload = {
      origin_zip: originZip ? originZip.value : '78219',
      dest_zip: destZip.value.trim(),
      weight_lbs: parseFloat(weightLbs.value),
      length_in: shipLength ? parseFloat(shipLength.value) : null,
      width_in: shipWidth ? parseFloat(shipWidth.value) : null,
      height_in: shipHeight ? parseFloat(shipHeight.value) : null,
      freight_class: freightClass ? freightClass.value : '70',
      origin_type: originType ? originType.value : 'BUSINESS',
      dest_type: destType ? destType.value : 'RESIDENTIAL',
      liftgate: liftgate ? liftgate.checked : false
    };

    // Clear previous timeout
    if (quoteTimeout) {
      clearTimeout(quoteTimeout);
    }

    // Set timeout
    quoteTimeout = setTimeout(function() {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Get freight quote';
      }
      if (status) {
        status.textContent = 'Request timed out. Please try again.';
      }
      if (results) {
        results.innerHTML = '<p style="color:#d9534f;">Request timed out. Please try again.</p>';
      }
    }, config.QUOTE_TIMEOUT_MS);

    // Make API request
    fetch(config.QUOTE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      if (quoteTimeout) {
        clearTimeout(quoteTimeout);
        quoteTimeout = null;
      }

      if (!response.ok) {
        throw new Error('Quote request failed: ' + response.status);
      }

      return response.json();
    })
    .then(function(data) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Get freight quote';
      }

      if (!data || !data.quotes || !Array.isArray(data.quotes) || data.quotes.length === 0) {
        if (status) {
          status.textContent = 'No quotes available for this destination.';
        }
        if (results) {
          results.innerHTML = '<p style="color:#d9534f;">No quotes available for this destination. Please contact us for shipping options.</p>';
        }
        return;
      }

      displayQuotes(data.quotes);

      if (status) {
        status.textContent = 'Select a shipping option below.';
      }
    })
    .catch(function(error) {
      console.error('[shipping.js] Quote error:', error);

      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Get freight quote';
      }

      if (status) {
        status.textContent = 'Error fetching quotes. Please try again.';
      }

      if (results) {
        results.innerHTML = '<p style="color:#d9534f;">Error fetching quotes. Please try again or contact us for shipping options.</p>';
      }
    });
  }

  /**
   * Display quotes in results area
   */
  function displayQuotes(quotes) {
    var results = document.getElementById('quote-results');
    if (!results) return;

    var html = '<div style="margin-top:16px;padding-top:16px;border-top:1px solid #f0f0f0;">';
    html += '<h3 style="margin:0 0 12px;font-size:14px;font-weight:600;">Available Shipping Options</h3>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;">';

    quotes.forEach(function(quote, index) {
      var quoteId = 'quote-' + index;
      var price = formatPrice(quote.price_cents || quote.price || 0);
      var carrier = quote.carrier || 'Freight Carrier';
      var service = quote.service || 'Standard Freight';
      var transitDays = quote.transit_days ? ' (' + quote.transit_days + ' days)' : '';

      html += '<label style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid #e0e0e0;border-radius:8px;cursor:pointer;transition:all 0.2s;">';
      html += '<input type="radio" name="shipping-quote" value="' + quoteId + '" data-quote-index="' + index + '" style="cursor:pointer;">';
      html += '<div style="flex:1;">';
      html += '<div style="font-weight:600;font-size:14px;">' + carrier + '</div>';
      html += '<div style="font-size:12px;color:#666;">' + service + transitDays + '</div>';
      html += '</div>';
      html += '<div style="font-weight:600;font-size:16px;">' + price + '</div>';
      html += '</label>';

      // Store quote data
      if (!window.QUOTE_DATA) {
        window.QUOTE_DATA = [];
      }
      window.QUOTE_DATA[index] = quote;
    });

    html += '</div>';
    html += '</div>';

    results.innerHTML = html;

    // Add change listeners to radio buttons
    var radios = results.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        var index = parseInt(this.getAttribute('data-quote-index'));
        selectedQuote = window.QUOTE_DATA[index];
        
        // Activate checkout button
        var continueBtn = document.getElementById('btn-continue');
        if (continueBtn) {
          continueBtn.disabled = false;
          continueBtn.classList.remove('sq-btn-secondary');
          continueBtn.classList.add('sq-btn-primary');
          continueBtn.style.cursor = 'pointer';
        }
      });
    });
  }

  /**
   * Format price in cents to dollars
   */
  function formatPrice(cents) {
    var dollars = (cents / 100).toFixed(2);
    return '$' + dollars;
  }

  /**
   * Add shipping to cart and redirect to checkout
   */
  function addShippingToCartAndCheckout(quote) {
    if (!quote) {
      alert('Please select a shipping quote');
      return;
    }

    // Add shipping as a note or custom attribute to cart
    // Then redirect to checkout
    var checkoutUrl = config.CHECKOUT_URL;
    
    // You may need to add shipping cost via Shopify Cart API first
    // For now, redirect to checkout - shipping can be added there
    window.location.href = checkoutUrl;
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initGetQuoteButton();
        initContinueButton();
      });
    } else {
      initGetQuoteButton();
      initContinueButton();
    }
  }

  init();
})();

