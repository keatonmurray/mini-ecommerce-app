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
            orders.attribute_value_id,
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
             $product['attribute_value_id'] = json_decode($product['attribute_value_id'], true) ?? [];
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

    //temporary - might delete - awaiting for scandiweb's confirmation regarding clarification
    protected function addProduct($productId, $quantity, $total)
    {
        $query = "INSERT INTO orders (products_id, quantity, total, created_at) VALUES (:productId, :quantity, :total, NOW())";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':productId', $productId);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':total', $total);

        $stmt->execute();

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

    protected function addItemToCart($products_id, $attribute_value_id, $item_price = 0)
    {
        $attribute_value_id = json_encode(['attribute' => $attribute_value_id]);

        $query = "INSERT INTO orders (products_id, quantity, item_price, attribute_value_id, created_at) 
            VALUES (:products_id, 1, :item_price, :attribute_value_id, NOW())";

        $stmt = $this->database->prepare($query);

        $stmt->bindParam(':products_id', $products_id, \PDO::PARAM_STR);
        $stmt->bindParam(':item_price', $item_price);
        $stmt->bindParam(':attribute_value_id', $attribute_value_id, \PDO::PARAM_STR);

        $stmt->execute();
    }

}