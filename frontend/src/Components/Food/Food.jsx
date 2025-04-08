import React, { useState } from 'react';
import "./Food.css";
import productsData from "./Data";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Food() {
    const [searchTerm, setSearchTerm] = useState("");

    const allItems = Object.entries(productsData).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
    );

    const filteredItems =
        searchTerm.trim() !== ""
            ? allItems.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : null;

    return (
        <div>
            <div className="vegetables-container">
                <input
                    type="text"
                    placeholder="Search for food items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                {searchTerm.trim() !== "" ? (
                    filteredItems.length > 0 ? (
                        <>
                            <h2 className="category-title">🔍 Search Results</h2>
                            <div className="products-container">
                                {filteredItems.map((product) => (
                                    <FoodCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="no-results">No results found for "{searchTerm}"</p>
                    )
                ) : (
                    Object.entries(productsData).map(([category, items]) => (
                        <React.Fragment key={category}>
                            <h2 className="category-title">
                                🍽️ {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h2>

                            <div className="products-container">
                                {items.map((product) => (
                                    <FoodCard key={product.id} product={product} />
                                ))}
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
}

function FoodCard({ product }) {
    const caloriesPerGram = !isNaN(Number(product.calories))
        ? Number(product.calories) / 100
        : 0;

    const [weight, setWeight] = useState(100);
    const [showDetails, setShowDetails] = useState(false);

    const calories = parseFloat((weight * caloriesPerGram).toFixed(2));
    const proteinAmount = ((calories * 0.25) / 4).toFixed(1);
    const carbsAmount = ((calories * 0.45) / 4).toFixed(1);
    const fatsAmount = ((calories * 0.3) / 9).toFixed(1);

    return (
        <div className="food-card">
            <div className="food-image-container">
                <img src={product.image} alt={product.name} className="food-image" />
            </div>
            <div className="food-info">
                <h3 className="food-name">{product.name}</h3>
                <span className="food-weight">{weight}g</span>
                
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className="weight-input"
                    placeholder="Weight (g)"
                />
                
                <p className="calories-display">
                    Calories: <span className="calories-value">{calories}</span>
                </p>
                
                <button 
                    className="toggle-details"
                    onClick={() => setShowDetails(!showDetails)}
                    aria-label={showDetails ? "Hide nutrition details" : "Show nutrition details"}
                >
                    {showDetails ? <FaArrowUp /> : <FaArrowDown />}
                </button>
                
                {showDetails && (
                    <div className="nutrition-details">
                        <div className="nutrition-item">
                            <span className="nutrition-label">Protein:</span>
                            <span>{proteinAmount}g</span>
                        </div>
                        <div className="nutrition-item">
                            <span className="nutrition-label">Carbs:</span>
                            <span>{carbsAmount}g</span>
                        </div>
                        <div className="nutrition-item">
                            <span className="nutrition-label">Fats:</span>
                            <span>{fatsAmount}g</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}