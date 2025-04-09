import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { token } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");

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
      setCartItems(data);
    } catch (err) {
      setError("Error loading cart: " + err.message);
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

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeFromCart = async (itemId) => {
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

    
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

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
      toast.success("Cart cleared successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.prix * item.quantity,
      0
    );
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
    return <div className="text-center p-6">Loading cart...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Your Shopping Cart
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

       
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">Your cart is empty.</p>
              <Link
                to="/products"
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Product</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-center">Quantity</th>
                    <th className="py-3 px-6 text-right">Subtotal</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 flex items-center">
                        <img
                          src={`http://localhost:8000/storage/${item.product.image}`}
                          alt={item.product.nom}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <span>{item.product.nom}</span>
                      </td>
                      <td className="py-3 px-6">
                        ${parseFloat(item.product.prix).toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-right">
                        ${(item.product.prix * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 bg-gray-50">
                    <td colSpan="3" className="py-4 px-6 text-right font-bold">
                      Total:
                    </td>
                    <td className="py-4 px-6 text-right font-bold">
                      ${calculateTotal().toFixed(2)}
                    </td>
                    <td className="py-4 px-6"></td>
                  </tr>
                </tfoot>
              </table>

              <div className="p-6 flex justify-between">
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>

      
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 p-6 border-b">
            Order History
          </h2>

          {historyLoading ? (
            <div className="p-6 text-center">Loading order history...</div>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
               
                        toast.info("Reorder functionality coming soon!");
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded"
                    >
                      Order Again
                    </button>
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

export default Cart;
