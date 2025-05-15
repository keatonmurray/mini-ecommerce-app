<?php

namespace App\Models\Products;
use App\Config\Database;
use App\Models\Products\Attribute;

class Order extends Attribute {

    protected function cartItems($id)
    {
        return $this->attributes($id);
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
        $query = "INSERT INTO orders (products_id, quantity, item_price, created_at) VALUES (:productId, :quantity, :item_price, NOW())";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':productId', $productId);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':item_price', $total);

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

        $query = "INSERT INTO orders (products_id, quantity, item_price, selected_attributes, created_at) 
            VALUES (:products_id, 1, :item_price, :selected_attributes, NOW())";

        $stmt = $this->database->prepare($query);

        $stmt->bindParam(':products_id', $products_id, \PDO::PARAM_STR);
        $stmt->bindParam(':item_price', $item_price);
        $stmt->bindParam(':selected_attributes', $attribute_value_id, \PDO::PARAM_STR);

        $stmt->execute();
    }

}