import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

// SVG Icons for credit cards
const CardIcons = {
  visa: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 780 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 0H740C762.1 0 780 17.9 780 40V460C780 482.1 762.1 500 740 500H40C17.9 500 0 482.1 0 460V40C0 17.9 17.9 0 40 0Z"
        fill="#0066B2"
      />
      <path d="M330 350L375 149H434L389 350H330Z" fill="white" />
      <path
        d="M556 149C541 149 526 154 519 166L445 350H508L517 323H584L591 350H649L608 149H556ZM535 277L562 196L578 277H535Z"
        fill="white"
      />
      <path
        d="M223 149L171 289L164 260C155 233 132 204 106 190L156 350H221L310 149H223Z"
        fill="white"
      />
      <path
        d="M131 149H32L31 154C98 170 145 208 164 260L150 175C148 165 140 150 131 149Z"
        fill="#FAA61A"
      />
    </svg>
  ),
  mastercard: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 780 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 0H740C762.1 0 780 17.9 780 40V460C780 482.1 762.1 500 740 500H40C17.9 500 0 482.1 0 460V40C0 17.9 17.9 0 40 0Z"
        fill="white"
      />
      <path
        d="M449 250C449 182 502 126 568 126C634 126 688 182 688 250C688 318 634 374 568 374C502 374 449 318 449 250Z"
        fill="#FF5F00"
      />
      <path
        d="M305 250C305 182 358 126 424 126C490 126 544 182 544 250C544 318 490 374 424 374C358 374 305 318 305 250Z"
        fill="#EB001B"
      />
      <path
        d="M424 374C391 374 361 360 339 337C361 314 391 301 424 301C457 301 487 314 509 337C487 360 457 374 424 374Z"
        fill="#F79E1B"
      />
    </svg>
  ),
};

const CartPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectedCard, setSelectedCard] = useState("");
  const [formData, setFormData] = useState({
    payment_method: "credit_card",
    card_number: "",
    cardholder_name: "",
    card_expiry: "",
    card_cvv: "",
    shipping_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "US",
  });

  useEffect(() => {
    // Get cart data if not passed through location state
    if (!location.state || !location.state.planPrice) {
      fetchCartItems();
    } else {
      setCartTotal(location.state.planPrice);
    }
  }, [location.state]);

  // Detect card type from number
  useEffect(() => {
    const cardNumber = formData.card_number.replace(/\s/g, "");

    if (/^4/.test(cardNumber)) {
      setSelectedCard("visa");
    } else if (/^5[1-5]/.test(cardNumber)) {
      setSelectedCard("mastercard");
    } else {
      setSelectedCard("");
    }
  }, [formData.card_number]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data.items || []);
      setCartTotal(data.total || 0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "card_number") {
      const formatted =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";

      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else if (name === "card_expiry") {
      // Format expiry date with slash
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 2) {
        formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
      }

      setFormData({
        ...formData,
        [name]: formatted,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // In CartPayment.jsx
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Create shipping address string
      const shippingAddress = `${formData.shipping_address}, ${formData.city}, ${formData.state} ${formData.zip_code}, ${formData.country}`;

      // Determine if this is a subscription or a regular purchase
      const isSubscription =
        location.state &&
        location.state.planType &&
        location.state.planType !== "cart-purchase";

      // Choose the appropriate endpoint
      const endpoint = isSubscription ? "/api/subscribe" : "/api/checkout";

      // Prepare the request body
      const requestBody = {
        payment_method: formData.payment_method,
        shipping_address: shippingAddress,
      };

      // Add plan-specific data if this is a subscription
      if (isSubscription) {
        requestBody.plan_type = location.state.planType;
        requestBody.plan_name = location.state.planName;
        requestBody.plan_price = location.state.planPrice;
      }

      console.log("Sending request to:", endpoint);
      console.log("Request data:", JSON.stringify(requestBody, null, 2));

      // Submit order to backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        const errorMessage =
          data.error ||
          data.message ||
          `Payment failed: ${response.statusText}`;
        console.error("Error response:", data);
        throw new Error(errorMessage);
      }

      // Show success message
      toast.success(
        isSubscription
          ? "Subscription successful! Your subscription has been activated."
          : "Payment successful! Your order has been placed."
      );

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/client/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(`Payment error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    // Basic validation
    if (
      !formData.card_number ||
      formData.card_number.replace(/\s/g, "").length < 16
    ) {
      toast.error("Please enter a valid card number");
      return false;
    }

    if (!formData.cardholder_name) {
      toast.error("Please enter the cardholder name");
      return false;
    }

    if (
      !formData.card_expiry ||
      !formData.card_expiry.match(/^\d{2}\/\d{2}$/)
    ) {
      toast.error("Please enter expiry date in MM/YY format");
      return false;
    }

    if (!formData.card_cvv || formData.card_cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return false;
    }

    if (!formData.shipping_address) {
      toast.error("Please enter your shipping address");
      return false;
    }

    if (!formData.city) {
      toast.error("Please enter your city");
      return false;
    }

    if (!formData.state) {
      toast.error("Please enter your state/province");
      return false;
    }

    if (!formData.zip_code) {
      toast.error("Please enter your ZIP/postal code");
      return false;
    }

    return true;
  };

  if (loading && !cartTotal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Determine if this is a subscription or regular purchase
  const isSubscription =
    location.state &&
    location.state.planType &&
    location.state.planType !== "cart-purchase";
  const pageTitle = isSubscription
    ? "Subscription Checkout"
    : "Product Checkout";
  const paymentType = isSubscription
    ? location.state.planName
    : "Product Purchase";

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{pageTitle}</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 flex justify-between">
              <p className="text-gray-600">{paymentType}</p>
              <p className="text-2xl font-bold">
                ${parseFloat(cartTotal).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

            {/* Card Icons */}
            <div className="flex space-x-3 mb-6">
              <div
                className={`transition-opacity ${
                  selectedCard === "visa" ? "opacity-100" : "opacity-40"
                }`}
              >
                {CardIcons.visa}
              </div>
              <div
                className={`transition-opacity ${
                  selectedCard === "mastercard" ? "opacity-100" : "opacity-40"
                }`}
              >
                {CardIcons.mastercard}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="credit_card"
                      checked={formData.payment_method === "credit_card"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Credit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="paypal"
                      checked={formData.payment_method === "paypal"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    PayPal
                  </label>
                </div>
              </div>

              {formData.payment_method === "credit_card" && (
                <>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="card_number"
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="card_number"
                        name="card_number"
                        placeholder="1234 5678 9012 3456"
                        value={formData.card_number}
                        onChange={handleInputChange}
                        maxLength="19"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {selectedCard && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6">
                          {CardIcons[selectedCard]}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="cardholder_name"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardholder_name"
                      name="cardholder_name"
                      placeholder="John Doe"
                      value={formData.cardholder_name}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex mb-4 space-x-4">
                    <div className="w-1/2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="card_expiry"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="card_expiry"
                        name="card_expiry"
                        placeholder="MM/YY"
                        value={formData.card_expiry}
                        onChange={handleInputChange}
                        maxLength="5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="card_cvv"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="card_cvv"
                        name="card_cvv"
                        placeholder="123"
                        value={formData.card_cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6 mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Shipping Information
                </h3>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="shipping_address"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="shipping_address"
                    name="shipping_address"
                    placeholder="123 Main St"
                    value={formData.shipping_address}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-wrap mb-4 -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="state"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="NY"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap mb-4 -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="zip_code"
                    >
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      placeholder="10001"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                      <option value="UK">United Kingdom</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Complete Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
