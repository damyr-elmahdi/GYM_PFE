<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    // Static method to get plan details
    public static function getPlanDetails()
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
}