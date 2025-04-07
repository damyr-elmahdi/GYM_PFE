import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import iconCart from "../../Assets/iconCart.png";
import "./ClientProductList.css";
import axios from "axios";

const ClientProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const { token } = useContext(AppContext);
  const [selectedRating, setSelectedRating] = useState(null); // Track the clicked star rating

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating, productId) => {
    setSelectedRating(rating);
    // Here, you can update the number of reviews based on the rating
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, rating, reviews: 3 } : product
    );
    setProducts(updatedProducts);
  };

  const renderStars = (rating, productId) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFilled = i < rating;
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : ""}`}
          style={{
            fontSize: "23px",
            color: isFilled || (selectedRating && selectedRating >= i + 1) ? "#FFD700" : "#ccc", // Update color for clicked stars
            cursor: "pointer",
          }}
          onClick={() => handleStarClick(i + 1, productId)} // Update rating when star clicked
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const addToCart = async (product) => {
    if (!token) {
      setCartMessage("Please log in to add items to your cart");
      setTimeout(() => setCartMessage(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          nom: product.nom,
          prix: product.prix,
          image: product.image,
          quantity: 1, // Default quantity
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      setCartMessage("Product added to cart!");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      setCartMessage(err.message);
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="flex justify-center text-3xl font-bold text-gray-800 mb-6">Our Products</h1>

        {cartMessage && (
          <div className={`p-4 rounded-md mb-4 ${cartMessage.includes("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {cartMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center p-6">
              No products available at the moment.
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="div-all-t bg-white rounded-lg shadow-md overflow-hidden w-[260px] mt-[30px]">
                <div className="img-d">
                  <Link to={`/client/products/${product.id}`}>
                    <img
                      src={`http://localhost:8000/storage/${product.image}`}
                      alt={product.nom}
                      className="image-product"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <h3 className="text-center">{product.nom}</h3>

                  <div className="stars">
                    {renderStars(product.rating, product.id)}
                    <p className="number-review">({product.reviews || 2})</p>
                  </div>
                  <p className="price-p">${parseFloat(product.prix).toFixed(2)}</p>

                  <div className="absolute discount text-[#999696] text-sm line-through mt-[-3px]">
                    ${(product.prix * 0.9).toFixed(2)}
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2 mx-auto mt-[-4px] ml-[103px]"
                      onClick={() => addToCart(product)}
                    >
                      <img src={iconCart} alt="" className="w-[14px]" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProductList;
