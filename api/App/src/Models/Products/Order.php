<?php

namespace App\Models\Products;
use App\Config\Database;

class Order {

    private $database;

    public function __construct()
    {
       $this->database = (new Database)->connect();
    }

}