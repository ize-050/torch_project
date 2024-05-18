<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('name');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });


        Schema::create('catgory_products', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('cat_name')->comment('ชื่อหมวดหมู่');
            $table->string('cat_parents')->comment('ลำดับ');
            $table->string('cat_picture');
            $table->string('cat_detail');
            $table->boolean('cat_status')->default(1);
            $table->timestamps();
        });


        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cat_id')->unsigned();
            $table->foreign('cat_id')->references('id')->on('catgory_products');
            $table->string('product_name');
            $table->string('product_title')->nullable();
            $table->text('product_detail')->nullable();
            $table->string('product_price')->nullable();
            $table->boolean('product_status')->default(1);
            $table->timestamps();
        });
        
        Schema::create('product_images', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->foreign('product_id')->references('id')->on('products');
            $table->string('image_names')->comment('รูปภาพ');
            $table->timestamps();
        });



        Schema::create('banner', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('banner_name');
            $table->string('banner_picture')->comment('รูปภาพ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
