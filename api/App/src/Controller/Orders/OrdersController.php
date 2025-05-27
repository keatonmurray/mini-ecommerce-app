<?php

namespace App\Controller\Orders;
use App\Models\Orders\Order;

class OrdersController extends Order
{
    public function getOrders()
    {
        return $this->orders();
    }

    public function addToCart($orderDetails)
    {
        return $this->cart($orderDetails);
    }

    public function removeFromCart($id) 
    {
        return $this->removeItem($id);
    }
}