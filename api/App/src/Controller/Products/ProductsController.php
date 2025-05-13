<?php

namespace App\Controller\Products;
use App\Models\Products\Product;

class ProductsController extends Product
{
    public function getProducts()
    {
        return $this->products();
    }

    public function addToCart($orderDetails, $orderStatus, $orderTotal)
    {
        return $this->addProduct($orderDetails, $orderStatus, $orderTotal);
    }
}
