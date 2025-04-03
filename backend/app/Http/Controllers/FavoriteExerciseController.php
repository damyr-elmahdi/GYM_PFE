<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoriteExerciseController extends Controller
{
    public function toggleFavorite(Request $request, $id)
    {
        try {
            $user = $request->user();
            $exercise = Exercise::findOrFail($id);
            
            // Check if the exercise is already favorited
            if ($user->favoriteExercises()->where('exercise_id', $id)->exists()) {
                $user->favoriteExercises()->detach($id);
                return response()->json([
                    'message' => 'Exercise removed from favorites',
                    'isFavorite' => false
                ]);
            } else {
                $user->favoriteExercises()->attach($id);
                return response()->json([
                    'message' => 'Exercise added to favorites',
                    'isFavorite' => true
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Error toggling favorite: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to toggle favorite',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function getFavorites(Request $request)
    {
        try {
            $user = $request->user();
            $favorites = $user->favoriteExercises()->get();
            
            return response()->json($favorites);
        } catch (\Exception $e) {
            Log::error('Error getting favorites: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to retrieve favorites',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}