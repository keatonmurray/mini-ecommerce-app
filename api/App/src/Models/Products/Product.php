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
                products.in_stock, 
                prices.amount, 
                prices.currency 
            FROM products 
            INNER JOIN prices ON products.id = prices.product_id";

            $stmt = $this->database->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
            foreach ($products as &$product) {
                $product['gallery'] = json_decode($product['gallery'], true) ?? [];
                $product['currency'] = json_decode($product['currency'], true) ?? [];            
            }

            return $products;
        }

    }