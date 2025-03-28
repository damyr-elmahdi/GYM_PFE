<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    public function favoriteExercises()
    {
        return $this->belongsToMany(Exercise::class, 'favorite_exercises', 'user_id', 'exercise_id')
            ->withTimestamps();
    }
    public function subscription()
    {
        return $this->hasOne(Subscription::class)->latestOfMany();
    }

    // Method to check if user has an active subscription
    public function hasActiveSubscription()
    {
        return $this->subscription()->where('status', 'active')
                    ->where('end_date', '>=', now())
                    ->exists();
    }
}