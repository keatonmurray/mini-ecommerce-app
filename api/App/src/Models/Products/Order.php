<?php

namespace App\Models\Products;
use App\Config\Database;

class Order {

    private $database;

    public function __construct()
    {
       $this->database = (new Database)->connect();
    }

    protected function cartItems()
    {
        $query = "SELECT 
            orders.products_id, 
            orders.quantity, 
            orders.item_price,
            orders.selected_attributes,
            products.name,
            products.gallery,
            prices.amount
            FROM orders
            INNER JOIN products ON orders.products_id = products.id
            INNER JOIN prices ON orders.products_id = prices.product_id
            ORDER BY orders.created_at DESC";

        $stmt = $this->database->prepare($query);
        $stmt->execute();
        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($products as &$product) {
            $product['gallery'] = json_decode($product['gallery'], true) ?? [];
            $product['selected_attributes'] = json_decode($product['selected_attributes'], true) ?? [];
        }

        return $products;
    }

    protected function cartItemsCount()
    {
        $query = "SELECT COUNT(*) AS cart_items FROM orders;";
        
        $stmt = $this->database->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC); 
    }

    protected function cartQuantityCount($quantity, $products_id)
    {
        $query = "UPDATE orders SET quantity = :quantity 
            WHERE products_id = :products_id";
        
        $stmt = $this->database->prepare($query); 
        
        $stmt->bindParam(':quantity', $quantity, \PDO::PARAM_INT); 
        $stmt->bindParam(':products_id', $products_id, \PDO::PARAM_STR); 
        
        $stmt->execute();

    }

}