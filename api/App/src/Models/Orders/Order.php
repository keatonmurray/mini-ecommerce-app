<?php

namespace App\Models\Orders;
use App\Config\Database;

class Order {

    private $database;

    public function __construct()
    {
       $this->database = (new Database)->connect();
    }

    protected function orders()
    {
        $query = "SELECT order_details FROM orders";
        $stmt = $this->database->prepare($query);
        $stmt->execute();
        
        $orderDetails = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($orderDetails as &$row) {
            $row['order_details'] = json_decode($row['order_details'], true) ?? [];
        }

        return $orderDetails;
    }

   protected function cart($orderDetails)
    {
        $json = json_encode($orderDetails, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        
        $query = "INSERT INTO orders (order_details, order_status, total, created_at) VALUES (:order_details, 'received', '100', NOW())";
        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':order_details', $json);
        $stmt->execute();
    }

}