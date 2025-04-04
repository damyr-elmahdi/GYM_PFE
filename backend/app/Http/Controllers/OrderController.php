<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'shipping_address' => 'required|string',
        ]);
        
        // Start a database transaction
        return DB::transaction(function () use ($request) {
            $user = $request->user();
            
            // Get the user's cart items
            $cartItems = CartItem::where('user_id', $user->id)
                ->with('product')
                ->get();
                
            if ($cartItems->isEmpty()) {
                return response()->json([
                    'message' => 'Your cart is empty'
                ], 400);
            }
            
            // Calculate the total
            $total = 0;
            foreach ($cartItems as $item) {
                $total += $item->product->prix * $item->quantity;
            }
            
            // Create a new order
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                'status' => 'paid', // Could be 'processing', 'pending', etc. depending on your workflow
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->shipping_address
            ]);
            
            // Create order items for each cart item
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->prix
                ]);
                
                // Update product stock
                $product = Product::find($item->product_id);
                $product->stock = $product->stock - $item->quantity;
                $product->save();
            }
            
            // Clear the user's cart after successful order creation
            CartItem::where('user_id', $user->id)->delete();
            
            return response()->json([
                'message' => 'Order created successfully',
                'order_id' => $order->id
            ]);
        });
    }
    
    public function getOrderHistory(Request $request)
    {
        // Get all orders for the user with their items and products
        $orderItems = OrderItem::whereHas('order', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })
        ->with(['order', 'product'])
        ->get()
        ->map(function ($item) {
            return [
                'order_id' => $item->order_id,
                'product_id' => $item->product_id,
                'product_name' => $item->product->nom,
                'product_image' => $item->product->image,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'created_at' => $item->order->created_at
            ];
        });
        
        return response()->json($orderItems);
    }
}