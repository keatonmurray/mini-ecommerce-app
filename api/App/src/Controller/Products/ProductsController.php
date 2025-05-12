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
        $orderDetailsJson = json_encode($orderDetails);
        return $this->addProduct($orderDetailsJson, $orderStatus, $orderTotal);
    }
}
