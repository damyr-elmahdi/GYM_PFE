<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {
        $validatedData = $request->validate([
            'cardDetails' => 'required',
            'amount' => 'required|numeric'
        ]);
        

        
        return response()->json([
            'success' => true,
            'message' => 'Payment processed successfully'
        ]);
    }
}