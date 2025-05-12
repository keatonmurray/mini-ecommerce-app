<?php

    namespace App\Models\Products;
    use App\Config\Database;

    class Product 
    {
        private $database;

        public function __construct()
        {
            $this->database = (new Database)->connect();
        }

        protected function products() {
            $query = "SELECT 
                products.id AS slug, 
                products.name, 
                products.gallery, 
                prices.amount, 
                prices.currency 
            FROM products 
            INNER JOIN prices ON products.id = prices.product_id";

            $stmt = $this->database->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
            foreach ($products as &$product) {
                $product['gallery'] = json_decode($product['gallery'], true) ?? [];
                $product['currency'] = json_decode($product['currency'], true) ?? [];            }

            return $products;
        }

        protected function addProduct($order_details, $order_status, $total)
        {
            $query = "INSERT INTO orders (order_details, order_status, total, created_at) 
                    VALUES (:order_details, :order_status, :total, NOW())";

            $stmt = $this->database->prepare($query);
            $stmt->bindParam(':order_details', $order_details);
            $stmt->bindParam(':order_status', $order_status);
            $stmt->bindParam(':total', $total);

            $stmt->execute();

            return "Order inserted successfully";
        }
    }