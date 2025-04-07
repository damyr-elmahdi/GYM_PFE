<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ForgetController extends Controller
{
    //

    public function sendResetCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email not found.'], 404);
        }

        // Generate a 6-digit code
        $code = rand(100000, 999999);

        // Store code in cache for 10 minutes
        cache()->put('reset_code_' . $user->email, $code, now()->addMinutes(10));

        // Send the code via email
        Mail::raw("Your password reset code is: $code", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Password Reset Code');
        });

        return response()->json(['message' => 'Verification code sent.']);
    }
}
