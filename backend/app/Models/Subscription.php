<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'plan_type', 
        'start_date', 
        'end_date', 
        'status', 
        'price',
        'features'
    ];

    protected $dates = [
        'start_date', 
        'end_date'
    ];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope for active subscriptions
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where('end_date', '>=', now());
    }

    // Default plans - used as fallback
    public static function getDefaultPlans()
    {
        return [
            'basic' => [
                'name' => 'Basic Plan',
                'price' => 19.99,
                'features' => [
                    'Smart workout plan',
                    'At home workouts'
                ]
            ],
            'weekly' => [
                'name' => 'Weekly Plan',
                'price' => 49.99,
                'features' => [
                    'PRO Gyms',
                    'Smart workout plan', 
                    'At home workouts'
                ]
            ],
            'monthly' => [
                'name' => 'Monthly Plan',
                'price' => 99.99,
                'features' => [
                    'ELITE Gyms & Classes',
                    'PRO Gyms',
                    'Smart workout plan',
                    'At home workouts',
                    'Personal Training'
                ]
            ]
        ];
    }

    // Get plan details including custom plans
    public static function getPlanDetails()
    {
        // Use cache to avoid frequent database queries for plan data
        return Cache::remember('subscription_plans', 60 * 60, function () {
            $plans = self::getDefaultPlans();
            
            // Check if plan_details table exists
            if (DB::getSchemaBuilder()->hasTable('plan_details')) {
                // Fetch custom plans from the database
                $customPlans = DB::table('plan_details')->get();
                
                foreach ($customPlans as $plan) {
                    $plans[$plan->plan_type] = [
                        'name' => $plan->name,
                        'price' => (float) $plan->price,
                        'features' => json_decode($plan->features)
                    ];
                }
            }
            
            return $plans;
        });
    }

    // Clear plan cache
    public static function clearPlanCache()
    {
        Cache::forget('subscription_plans');
    }
}