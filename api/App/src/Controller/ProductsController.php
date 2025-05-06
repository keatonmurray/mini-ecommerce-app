<?php

namespace App\Controller;
use App\Models\Product;

class ProductsController extends Product
{
    public function getProducts()
    {
        return $this->products();
    }
}
