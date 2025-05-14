<?php

namespace App\Controller\Products;
use App\Models\Products\Order;

class OrdersController extends Order
{
    public function getCartItems()
    {
        return $this->cartItems();
    }

     public function getCartItemsCount()
    {
        return $this->cartItemsCount(); 
    }

    public function getCartQuantityCount($quantity, $products_id)
    {
        return $this->cartQuantityCount($quantity, $products_id);
    }
}