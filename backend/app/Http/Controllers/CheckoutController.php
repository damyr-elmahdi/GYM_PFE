<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Process checkout and create order
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkout(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string|in:credit_card,paypal',
            'shipping_address' => 'required|string|max:255',
        ]);

        // Get authenticated user
        $user = Auth::user();
        
        // Begin transaction
        DB::beginTransaction();
        
        try {
            // Get user's cart items
            $cartItems = CartItem::where('user_id', $user->id)
                ->with('product')
                ->get();
                
            // Check if cart is empty
            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 400);
            }
            
            // Calculate total price
            $totalPrice = 0;
            foreach ($cartItems as $item) {
                $totalPrice += $item->product->prix * $item->quantity;
            }
            
            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'address' => $request->shipping_address,
                'payment_method' => $request->payment_method,
                'delivery_status' => 'pending',
            ]);
            
            // Create order items
            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->prix,
                ]);
                
                // Update product stock (optional)
                // $item->product->decrement('stock', $item->quantity);
            }
            
            // Clear cart after successful order
            CartItem::where('user_id', $user->id)->delete();
            
            // Commit transaction
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Order placed successfully',
                'order_id' => $order->id
            ], 201);
            
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            
            return response()->json([
                'message' => 'Failed to process checkout: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get user's order history
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOrderHistory()
    {
        $user = Auth::user();
        
        // Get all orders with items and product details
        $orderItems = OrderItem::whereHas('order', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->with(['order', 'product'])
        ->get()
        ->map(function($item) {
            return [
                'order_id' => $item->order_id,
                'product_id' => $item->product_id,
                'product_name' => $item->product->nom,
                'product_image' => $item->product->image,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'created_at' => $item->order->created_at,
                'status' => $item->order->status,
                'delivery_status' => $item->order->delivery_status,
            ];
        });
        
        return response()->json($orderItems);
    }
}