<?php

namespace App\Controller;
use App\Config\Database;

class ProductsController {

    public function __construct() 
    {
        $database = new Database();
        $database->connect();
    }
    
    public function getProducts()
    {
        
    }
}