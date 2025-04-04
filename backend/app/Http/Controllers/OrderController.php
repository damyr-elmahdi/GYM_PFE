<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Get the order history for the authenticated user
     */
    public function getOrderHistory()
    {
        $user = Auth::user();
        
        // Get all orders for the user with their items
        $orders = Order::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with('orderItems.product')
            ->get();
            
        // Format the order history data
        $orderHistory = [];
        
        foreach ($orders as $order) {
            foreach ($order->orderItems as $item) {
                $orderHistory[] = [
                    'order_id' => $order->id,
                    'created_at' => $order->created_at,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->nom,
                    'product_image' => $item->product->image,
                    'price' => $item->price,
                    'quantity' => $item->quantity
                ];
            }
        }
        
        return response()->json($orderHistory);
    }
    
    /**
     * Create a new order from cart items
     */
    public function createOrder(Request $request)
    {
        $user = Auth::user();
        
        // Get user's cart items
        $cartItems = $user->cart->cartItems()->with('product')->get();
        
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }
        
        // Calculate total
        $total = 0;
        foreach ($cartItems as $cartItem) {
            $total += $cartItem->product->prix * $cartItem->quantity;
        }
        
        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'total' => $total,
            'status' => 'completed',
            'payment_method' => $request->payment_method ?? 'card',
            'shipping_address' => $request->shipping_address ?? null,
        ]);
        
        // Create order items
        foreach ($cartItems as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->prix,
            ]);
        }
        
        // Clear the cart
        $user->cart->cartItems()->delete();
        
        return response()->json([
            'message' => 'Order created successfully',
            'order_id' => $order->id
        ], 201);
    }
}