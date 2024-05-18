<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Catgory;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';


    public function catgorys()
    {
        return $this->belongsTo(Catgory::class, 'cat_id', 'id');
    }

    public function product_images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }


}



