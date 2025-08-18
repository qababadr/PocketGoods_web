<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductPreviewResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function paginate(): AnonymousResourceCollection
    {
        $products = Product::orderBy('created_at')->paginate(9);
        return ProductPreviewResource::collection($products);
    }

    public function getDetails(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function suggestions(Request $request): AnonymousResourceCollection
    {
        $products = [];

        $value = $request->search_query;

        if ($value !== "") {
            $products = Product::where("title", "LIKE", "%{$value}%")
                ->orWhere("description", "LIKE", "%{$value}%")
                ->orderBy("created_at", "desc")
                ->limit(10)
                ->get();
        }

        return ProductPreviewResource::collection($products);
    }

    public function search(Request $request): AnonymousResourceCollection
    {
        $products = [];

        $value = $request->search_query;

        if ($value !== "") {
            $products = Product::where("title", "LIKE", "%{$value}%")
                ->orWhere("description", "LIKE", "%{$value}%")
                ->orderBy("created_at", "desc")
                ->paginate(9);
        }

        return ProductPreviewResource::collection($products);
    }
}
