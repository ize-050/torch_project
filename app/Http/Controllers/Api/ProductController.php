<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAllproduct()
    {
        try{
            $product = Product::with('product_images')->
            orderBy('cat_id','asc')->
            limit(12)->where('product_status',1)->get();
            foreach($product as $key => $product){
               $res[$key] = [
                       'id' => $product->id,
                       'name' => $product->product_name,
                       'price' => $product->product_price,
                       'images' => asset('images/product/' . $product->id . '/' . $product->product_images[0]->image_names),
                       'description' => $product->product_detail,
                       'catgory_id' => $product->cat_id,
                       'created_at' => $product->created_at,
                       'updated_at' => $product->updated_at
                   
               ];
            }

            return response()->json($res);
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getProductDetail($id){
        try{
            $product = Product::with('product_images')->where('id', $id)->first();
            $res = [
                'id' => $product->id,
                'name' => $product->product_name,
                'price' => $product->product_price,
                'product_images' => $product->product_images->map(function($image) use ($product){
                    return asset('images/product/' . $product->id . '/' . $image->image_names);
                }),
                'description' => $product->product_detail,
                'category' => $product->cat_id,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at
            ];
            return  response()->json($res);
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getAllproductByid($id){
        try{
            $product = Product::with('product_images')->where('cat_id',$id)->where('product_status',1)->get();
            foreach($product as $key => $product){
               $res[$key] = [
                       'id' => $product->id,
                       'name' => $product->product_name,
                       'price' => $product->product_price,
                       'images' => asset('images/product/' . $product->id . '/' . $product->product_images[0]->image_names),
                       'description' => $product->product_detail,
                       'catgory_id' => $product->cat_id,
                       'created_at' => $product->created_at,
                       'updated_at' => $product->updated_at
                   
               ];
            }

            return response()->json($res);
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
