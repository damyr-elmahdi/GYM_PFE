<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'address',
        'height',
        'weight',
        'fitness_goal',
        'medical_conditions',
        'date_of_birth',
        'gender',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',
        'height' => 'float',
        'weight' => 'float',
    ];

    /**
     * Check if the user has a specific role
     */
    public function hasRole($role)
    {
        return $this->role === $role;
    }

    // In User.php model
    public function favoriteExercises()
    {
        return $this->belongsToMany(Exercise::class, 'favorite_exercises', 'user_id', 'exercise_id')
            ->withTimestamps();
    }
}
