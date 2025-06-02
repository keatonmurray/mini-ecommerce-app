<?php

namespace App\Models\Categories;
use App\Config\Database;

class Category 
{
    private $database;

    public function __construct()
    {
        $this->database = (new Database)->connect();
    }

    protected function allCategories()
    {
        $query = "SELECT name AS category_name, 
            id AS product_id
            FROM categories";

        $stmt = $this->database->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function category($id)
    {
            $query = "SELECT 
                products.name AS product_name,
                products.id AS product_id,
                products.in_stock,
                categories.name AS category_name,
                products.gallery,
                prices.amount,
                prices.currency
            FROM categories
            INNER JOIN products
            ON categories.id = products.category_id
            INNER JOIN prices
            ON products.id = prices.product_id
            WHERE categories.name = :id";

            $stmt = $this->database->prepare($query);
            $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
            $stmt->execute();
            $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
            foreach ($products as &$product) {
                $product['gallery'] = json_decode($product['gallery'], true) ?? [];
                $product['currency'] = json_decode($product['currency'], true) ?? [];            
            }

            return $products;
    }
}