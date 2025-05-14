<?php

namespace App\Controller\Products;
use App\Models\Products\Product;

class ProductsController extends Product
{
    public function getProducts()
    {
        return $this->products();
    }

    public function addToCart($productId, $quantity, $total)
    {
        return $this->addProduct($productId, $quantity, $total);
    }

    public function getCartItems()
    {
        return $this->cartItems();
    }

    public function getCartItemsCount()
    {
        return $this->cartItemsCount(); 
    }

    public function getCartQuantityCount($quantity, $products_id)
    {
        return $this->cartQuantityCount($quantity, $products_id);
    }
}
