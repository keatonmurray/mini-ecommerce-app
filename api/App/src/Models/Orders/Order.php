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
        $query = "SELECT order_details FROM orders ORDER BY created_at DESC";
        $stmt = $this->database->prepare($query);
        $stmt->execute();

        $orderDetails = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($orderDetails as &$row) {
            $decoded = json_decode($row['order_details'], true);

            if (!is_array($decoded)) {
                $row['order_details'] = [];
                continue;
            }

            foreach ($decoded as &$product) {
                if (isset($product['attrs']) && is_array($product['attrs'])) {
                    $product['attrs'] = array_filter($product['attrs'], function ($attr) {
                        return !empty($attr['items']);
                    });
                }
            }

            $row['order_details'] = $decoded;
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