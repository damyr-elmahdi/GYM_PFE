<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SubscriptionController extends Controller
{
    
    public function getPlans()
    {
        return response()->json(Subscription::getPlanDetails());
    }

   
    public function createSubscription(Request $request)
    {
        $validatedData = $request->validate([
            'plan_type' => 'required|in:' . implode(',', array_keys(Subscription::getPlanDetails())),
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

    
    public function adminGetSubscriptions()
    {
        $subscriptions = Subscription::with('user')
                                     ->orderBy('created_at', 'desc')
                                     ->get();

        return response()->json($subscriptions);
    }

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

  
    public function createPlan(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'plan_type' => 'required|string|max:100|unique:plan_details,plan_type',
        'price' => 'required|numeric|min:0',
        'features' => 'required|array',
        'features.*' => 'string'
    ]);


    if (!DB::getSchemaBuilder()->hasTable('plan_details')) {
        Schema::create('plan_details', function (Blueprint $table) {
            $table->id();
            $table->string('plan_type', 100)->unique();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->json('features');
            $table->timestamps();
        });
    }
    
    
    DB::table('plan_details')->insert([
        'plan_type' => $validatedData['plan_type'],
        'name' => $validatedData['name'],
        'price' => $validatedData['price'],
        'features' => json_encode($validatedData['features']),
        'created_at' => now(),
        'updated_at' => now()
    ]);

    Subscription::clearPlanCache();

    return response()->json([
        'message' => 'Plan created successfully',
        'plan' => [
            'plan_type' => $validatedData['plan_type'],
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'features' => $validatedData['features']
        ]
    ], 201);
}

public function updatePlan(Request $request, $planType)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'features' => 'required|array',
        'features.*' => 'string'
    ]);

    
    $plan = DB::table('plan_details')->where('plan_type', $planType)->first();

    if (!$plan) {
       
        $defaultPlans = Subscription::getDefaultPlans();
        
        if (!isset($defaultPlans[$planType])) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        
       
        DB::table('plan_details')->insert([
            'plan_type' => $planType,
            'name' => $defaultPlans[$planType]['name'],
            'price' => $defaultPlans[$planType]['price'],
            'features' => json_encode($defaultPlans[$planType]['features']),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    
    DB::table('plan_details')
        ->where('plan_type', $planType)
        ->update([
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'features' => json_encode($validatedData['features']),
            'updated_at' => now()
        ]);

   
    Subscription::clearPlanCache();

    return response()->json([
        'message' => 'Plan updated successfully',
        'plan' => [
            'plan_type' => $planType,
            'name' => $validatedData['name'],
            'price' => $validatedData['price'],
            'features' => $validatedData['features']
        ]
    ]);
}
}
