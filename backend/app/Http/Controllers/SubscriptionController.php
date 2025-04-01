<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    // Get available plans
    public function getPlans()
    {
        return response()->json(Subscription::getPlanDetails());
    }

    // Create a subscription for a user
    public function createSubscription(Request $request)
    {
        $validatedData = $request->validate([
            'plan_type' => 'required|in:basic,weekly,monthly',
            'user_id' => 'required|exists:users,id'
        ]);

        $plans = Subscription::getPlanDetails();
        $selectedPlan = $plans[$validatedData['plan_type']];

        // Check if user already has an active subscription
        $existingSubscription = Subscription::where('user_id', $validatedData['user_id'])
                                            ->where('status', 'active')
                                            ->first();

        if ($existingSubscription) {
            return response()->json([
                'message' => 'You already have an active subscription'
            ], 400);
        }

        $subscription = Subscription::create([
            'user_id' => $validatedData['user_id'],
            'plan_type' => $validatedData['plan_type'],
            'start_date' => now(),
            'end_date' => now()->addMonth(),
            'status' => 'active',
            'price' => $selectedPlan['price'],
            'features' => json_encode($selectedPlan['features'])
        ]);

        return response()->json($subscription, 201);
    }

    // Get user's current subscription
    public function getUserSubscription(Request $request)
    {
        $user = $request->user();
        $subscription = Subscription::where('user_id', $user->id)
                                    ->where('status', 'active')
                                    ->first();

        if (!$subscription) {
            return response()->json(['message' => 'No active subscription'], 404);
        }

        return response()->json($subscription);
    }

    // Admin methods to manage subscriptions
    public function adminGetSubscriptions()
    {
        $subscriptions = Subscription::with('user')
                                     ->orderBy('created_at', 'desc')
                                     ->get();

        return response()->json($subscriptions);
    }

    // Cancel a subscription
    public function cancelSubscription(Request $request, $id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->update([
            'status' => 'cancelled',
            'end_date' => now()
        ]);

        return response()->json(['message' => 'Subscription cancelled successfully']);
    }

    public function cancelUserSubscription(Request $request)
{
    $user = $request->user();
    $validatedData = $request->validate([
        'id' => 'required|exists:subscriptions,id'
    ]);
    
    $subscription = Subscription::findOrFail($validatedData['id']);
    
    // Check if subscription belongs to user
    if ($subscription->user_id !== $user->id) {
        return response()->json([
            'message' => 'Unauthorized to cancel this subscription'
        ], 403);
    }
    
    $subscription->update([
        'status' => 'cancelled',
        'end_date' => now()
    ]);

    return response()->json([
        'message' => 'Subscription cancelled successfully',
        'subscription' => $subscription
    ]);
}

}