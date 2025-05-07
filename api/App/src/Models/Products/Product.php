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
            $query = "SELECT * FROM products";
            $stmt = $this->database->prepare($query);
            $stmt->execute();
    
            $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $products;
        }
    }