<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Get current user's cart
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        
        $cartItems = CartItem::where('user_id', $user->id)
            ->with('product')
            ->get();
            
        $total = $cartItems->sum(function($item) {
            return $item->product->prix * $item->quantity;
        });
        
        return response()->json([
            'items' => $cartItems,
            'total' => $total
        ]);
    }
    
    /**
     * Add item to cart
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        
        $user = Auth::user();
        
        
        $product = Product::findOrFail($request->product_id);
        
       
        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();
            
        if ($cartItem) {
            
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
           
            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }
        
        return response()->json([
            'message' => 'Product added to cart',
            'cart_item' => $cartItem
        ], 201);
    }
    
    /**
     * Update cart item quantity
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCartItem(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);
        
        $user = Auth::user();
        
        $cartItem = CartItem::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
            
        $cartItem->quantity = $request->quantity;
        $cartItem->save();
        
        return response()->json([
            'message' => 'Cart updated successfully',
            'cart_item' => $cartItem
        ]);
    }
    
    /**
     * Remove item from cart
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeCartItem($id)
    {
        $user = Auth::user();
        
        $cartItem = CartItem::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
            
        $cartItem->delete();
        
        return response()->json([
            'message' => 'Item removed from cart'
        ]);
    }
    
    /**
     * Clear all items from cart
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clearCart()
    {
        $user = Auth::user();
        
        CartItem::where('user_id', $user->id)->delete();
        
        return response()->json([
            'message' => 'Cart cleared successfully'
        ]);
    }
}