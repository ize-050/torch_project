<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catgory extends Model
{

    protected $table = 'catgory_products';
    use HasFactory;


    public function products()
    {
        return $this->hasMany(Product::class, 'cat_id', 'id');
    }
}
