<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'description' => 'required|string',
            'categorie' => 'required|string|max:100',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|max:2048', // Max 2MB
        ]);

        // Handle image upload
        $imagePath = $request->file('image')->store('products', 'public');
        
        $product = Product::create([
            'nom' => $request->nom,
            'prix' => $request->prix,
            'description' => $request->description,
            'categorie' => $request->categorie,
            'stock' => $request->stock,
            'image' => $imagePath,
        ]);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prix' => 'sometimes|required|numeric|min:0',
            'description' => 'sometimes|required|string',
            'categorie' => 'sometimes|required|string|max:100',
            'stock' => 'sometimes|required|integer|min:0',
            'image' => 'sometimes|nullable|image|max:2048', // Max 2MB, but now nullable
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            
            $imagePath = $request->file('image')->store('products', 'public');
            $product->image = $imagePath;
        }
        
        // Update other fields
        $product->nom = $request->input('nom', $product->nom);
        $product->prix = $request->input('prix', $product->prix);
        $product->description = $request->input('description', $product->description);
        $product->categorie = $request->input('categorie', $product->categorie);
        $product->stock = $request->input('stock', $product->stock);
        
        $product->save();

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        
        // Delete image from storage
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        
        $product->delete();
        
        return response()->json(null, 204);
    }
}