<?php

namespace App\Controller\Products;
use App\Models\Products\Product;

class ProductsController extends Product
{
    public function getProducts()
    {
        return $this->products();
    }

}
