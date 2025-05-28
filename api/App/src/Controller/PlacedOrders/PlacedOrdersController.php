<?php

namespace App\Controller\PlacedOrders;
use App\Models\PlacedOrders\PlacedOrders;

class PlacedOrdersController extends PlacedOrders
{
    public function complete_order($quantity, $order_id)
    {
        return $this->place_order($quantity, $order_id);
    }
}