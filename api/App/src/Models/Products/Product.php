<?php

    namespace App\Models\Products;
    use App\Config\Database;

    class Product {
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

        protected function product($id)
        {
            $query = "SELECT 
                products.name AS product_name,
                products.id AS product_id,
                attributes.name AS attribute_name,
                attribute_values.value,
                prices.amount,
                prices.currency
            FROM products
            INNER JOIN attributes ON attributes.product_id = products.id
            INNER JOIN attribute_values ON attribute_values.attribute_id = attributes.id
            INNER JOIN prices ON products.id = prices.product_id
            WHERE products.id = :id";
        
            $stmt = $this->database->prepare($query);
            $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
            $stmt->execute();
        
            $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
            foreach ($products as &$product) {
                $product['gallery'] = json_decode($product['gallery'], true) ?? [];
                $product['currency'] = json_decode($product['currency'], true) ?? [];            }

            return $products;
        }
        
    }