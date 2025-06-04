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
        $query = "SELECT 
            id AS primary_id, 
            order_details FROM orders 
            ORDER BY created_at DESC";

        $stmt = $this->database->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }


    public function getLatestOrder()
    {
        $query = "SELECT id, order_details 
                FROM orders 
                WHERE order_status = 'placed' 
                ORDER BY updated_at DESC 
                LIMIT 1";
        $stmt = $this->database->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function updateQuantity($orderId, $updatedJson)
    {
        $query = "UPDATE orders 
                SET order_details = :order_details, updated_at = NOW()
                WHERE id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':order_details', $updatedJson);
        $stmt->bindParam(':id', $orderId);
        return $stmt->execute();
    }

    protected function cart($orderDetails)
    {
        $json = json_encode($orderDetails, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        {
             $query = "INSERT INTO orders 
            (
                order_details, 
                order_status, 
                created_at
            ) 
            VALUES (:order_details, 'placed', NOW())";
            $stmt = $this->database->prepare($query);
            $stmt->bindParam(':order_details', $json);
            $stmt->execute();
        } 
    }

    protected function getProductDataByOrderId($id)
    {
        $query = "SELECT order_details FROM orders WHERE id = :id";
        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? json_decode($row['order_details'], true) : null;
    }

    protected function updateProductDataByOrderId($id, array $productData)
    {
        $json = json_encode($productData, JSON_UNESCAPED_SLASHES);
        $query = "UPDATE orders SET order_details = :productData WHERE id = :id";
        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':productData', $json);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }

}