<?php

namespace App\Models\PlacedOrders;
use App\Config\Database;

class PlacedOrders
{
    private $database;

    public function __construct()
    {
        $this->database = (new Database)->connect();
    }

    protected function place_order($order_id)
    {
        $query = "INSERT INTO placed_orders 
        (
            status, 
            order_id
        )
        VALUES ('completed', :order_id)
        ";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->execute();
    }
}