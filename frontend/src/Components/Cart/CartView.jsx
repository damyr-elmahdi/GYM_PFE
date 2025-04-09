import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { token, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchOrderHistory();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data.items);
      setTotalPrice(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("/api/order-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order history");
      }

      const data = await response.json();
      setOrderHistory(data);
    } catch (err) {
      console.error("Error loading order history:", err);
   
      setOrderHistory([]);
   
    } finally {
      setHistoryLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

    
      fetchCartItems();
      toast.success("Cart updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }


      fetchCartItems();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCartItems([]);
      setTotalPrice(0);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const proceedToCheckout = () => {
    navigate("/cartpayment", {
      state: {
        planType: "cart-purchase",
        planName: "Product Purchase",
        planPrice: totalPrice,
      },
    });
  };

  const addToCartFromHistory = async (product) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      fetchCartItems();
      toast.success(`${product.product_name} added to cart`);
    } catch (err) {
      toast.error(err.message);
    }
  };


  const groupedHistory = orderHistory.reduce((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = {
        order_id: item.order_id,
        date: item.created_at,
        total: 0,
        items: [],
      };
    }

    acc[item.order_id].items.push(item);
    acc[item.order_id].total += item.price * item.quantity;

    return acc;
  }, {});

  if (loading) {
    return <div className="text-center p-6">Loading your cart...</div>;
  }


  const handleBackClick = () => {
    navigate('/client/dashboard');  
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          className="absolute text-black px-4 py-2 rounded-lg transition-transform duration-300 mt-[0px] ml-[0px] hover:scale-105"
          onClick={handleBackClick} 
        > &larr; Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">
          Your Shopping Cart
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

      
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
            Current Cart
          </h2>

          {cartItems.length === 0 ? (
            <div className="bg-white p-6 text-center">
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
              <button
                onClick={() => navigate("/client/products")}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 object-cover rounded"
                              src={`http://localhost:8000/storage/${item.product.image}`}
                              alt={item.product.nom}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.nom}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.product.categorie}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${parseFloat(item.product.prix).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.product.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="shadow border text-center w-12 py-1 px-2 text-gray-700"
                          />
                          <button
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                            onClick={() => {
                              if (item.quantity < item.product.stock) {
                                updateQuantity(item.id, item.quantity + 1);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          $
                          {(
                            parseFloat(item.product.prix) * item.quantity
                          ).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      Total: ${parseFloat(totalPrice).toFixed(2)}
                    </div>
                    <div className="mt-4 flex space-x-4 justify-end">
                      <button
                        onClick={() => navigate("/client/products")}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={proceedToCheckout}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

       
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
            Your Previous Orders
          </h2>

          {historyLoading ? (
            <div className="p-6 text-center">Loading order history...</div>
          ) : historyError ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">
                Unable to load your order history at this time.
              </p>
              <p className="text-sm text-gray-500 mt-2">{historyError}</p>
              <button
                onClick={fetchOrderHistory}
                className="mt-3 text-blue-500 hover:text-blue-700 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : Object.values(groupedHistory).length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {Object.values(groupedHistory).map((order) => (
                <div key={order.order_id} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="font-semibold">
                        Order #{order.order_id}
                      </span>
                      <span className="text-gray-500 ml-4 text-sm">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="font-bold">
                      Total: ${order.total.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-gray-600 text-sm">
                          <th className="text-left pb-2">Product</th>
                          <th className="text-right pb-2">Price</th>
                          <th className="text-right pb-2">Quantity</th>
                          <th className="text-right pb-2">Subtotal</th>
                          <th className="text-right pb-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-sm">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="py-2">
                              <div className="flex items-center">
                                <img
                                  src={`http://localhost:8000/storage/${item.product_image}`}
                                  alt={item.product_name}
                                  className="w-10 h-10 object-cover rounded mr-3"
                                />
                                <span>{item.product_name}</span>
                              </div>
                            </td>
                            <td className="py-2 text-right">
                              ${parseFloat(item.price).toFixed(2)}
                            </td>
                            <td className="py-2 text-right">{item.quantity}</td>
                            <td className="py-2 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-2 text-right">
                              <button
                                onClick={() => addToCartFromHistory(item)}
                                className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded"
                              >
                                Add to Cart
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartView;
