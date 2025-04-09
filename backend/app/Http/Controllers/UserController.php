<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        
        $users = User::orderBy('created_at', 'desc')->paginate(10);
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,client'
        ]);

        $fields['password'] = Hash::make($fields['password']);
        
        $user = User::create($fields);
        
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($id)
            ],
            'role' => 'required|in:admin,client'
        ]);
        
        
        if ($request->has('password') && !empty($request->password)) {
            $request->validate([
                'password' => 'min:6'
            ]);
            $fields['password'] = Hash::make($request->password);
        }
        
        $user->update($fields);
        
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
       
        if (auth()->id()== $id) {
            return response()->json([
                'message' => 'You cannot delete your own account'
            ], 403);
        }
        
        $user->delete();
        
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function stats()
    {
        $stats = [
            'total' => User::count(),
            'admin' => User::where('role', 'admin')->count(),
            'client' => User::where('role', 'client')->count(),
            'recent' => User::where('created_at', '>=', now()->subDays(7))->count()
        ];
        
        return response()->json($stats);
    }
}