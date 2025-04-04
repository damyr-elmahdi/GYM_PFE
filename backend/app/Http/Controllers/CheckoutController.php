<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
            'shipping_address' => 'required|string',
        ]);

        // Get authenticated user
        $user = Auth::user();
        
        // Begin transaction
        DB::beginTransaction();
        
        try {
            // Log the checkout attempt
            Log::info('Checkout attempt by user: ' . $user->id . ' with payment method: ' . $request->payment_method);
            
            // Get user's cart items
            $cartItems = CartItem::where('user_id', $user->id)
                ->with('product')
                ->get();
            
            Log::info('Cart items found: ' . $cartItems->count());
                
            // Check if cart is empty
            if ($cartItems->isEmpty()) {
                Log::warning('Empty cart checkout attempt by user: ' . $user->id);
                return response()->json(['message' => 'Cart is empty'], 400);
            }
            
            // Calculate total price
            $totalPrice = 0;
            foreach ($cartItems as $item) {
                // Check if product exists and has price
                if (!$item->product) {
                    Log::error('Product not found for cart item: ' . $item->id);
                    throw new \Exception('Product not found for one of your cart items');
                }
                
                $totalPrice += $item->product->prix * $item->quantity;
            }
            
            Log::info('Total price calculated: ' . $totalPrice);
            
            // Create order
            try {
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_price' => $totalPrice,
                    'status' => 'pending',
                    'address' => $request->shipping_address,
                    'payment_method' => $request->payment_method,
                    'delivery_status' => 'pending',
                ]);
                
                Log::info('Order created with ID: ' . $order->id);
            } catch (\Exception $e) {
                Log::error('Failed to create order: ' . $e->getMessage());
                throw new \Exception('Failed to create order: ' . $e->getMessage());
            }
            
            // Create order items
            try {
                foreach ($cartItems as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->prix,
                    ]);
                }
                
                Log::info('Order items created for order: ' . $order->id);
            } catch (\Exception $e) {
                Log::error('Failed to create order items: ' . $e->getMessage());
                throw new \Exception('Failed to create order items: ' . $e->getMessage());
            }
            
            // Clear cart after successful order
            try {
                CartItem::where('user_id', $user->id)->delete();
                Log::info('Cart cleared for user: ' . $user->id);
            } catch (\Exception $e) {
                Log::error('Failed to clear cart: ' . $e->getMessage());
                throw new \Exception('Failed to clear cart: ' . $e->getMessage());
            }
            
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
            
            // Log the detailed error
            Log::error('Checkout Error: ' . $e->getMessage());
            Log::error('Error trace: ' . $e->getTraceAsString());
            
            // Return a more specific error message
            return response()->json([
                'message' => 'Failed to process checkout',
                'error' => $e->getMessage()
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