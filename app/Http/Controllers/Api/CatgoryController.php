<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Catgory;
class CatgoryController extends Controller
{
    public function getallMenuProducts()
    {
        try{
            $category = Catgory::with('products')->with('products.product_images')->get();
            foreach($category as $key => $cat){
               $res[$key] =[ 
                   'id' => $cat->id,
                   'cat_name' => $cat->cat_name,
                   'products' => $cat->products 
               ];

               $res[$key]['products'] = $cat->products->map(function($product){
                   return [
                       'id' => $product->id,
                       'name' => $product->product_name,
                       'price' => $product->product_price,
                       'description' => $product->product_detail,
                       'catgory_id' => $product->cat_id,
                       'created_at' => $product->created_at,
                       'updated_at' => $product->updated_at
                   ];
               });
            }

            return response()->json($res);
        }
        catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
