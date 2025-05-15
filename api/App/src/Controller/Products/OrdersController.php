<?php

namespace App\Controller\Products;
use App\Models\Products\Order;

class OrdersController extends Order
{
    public function getCartItems($id)
    {
        return $this->cartItems($id);
    }

     public function getCartItemsCount()
    {
        return $this->cartItemsCount(); 
    }

    public function getCartQuantityCount($quantity, $products_id)
    {
        return $this->cartQuantityCount($quantity, $products_id);
    }

    //temporary only - might delete
    public function addToCart($productId, $quantity, $total)
    {
        return $this->addProduct($productId, $quantity, $total);
    }

    public function addSelectedProductsToCart($products_id, $attribute_value_id)
    {
        return $this->addItemToCart($products_id, $attribute_value_id);
    }
}