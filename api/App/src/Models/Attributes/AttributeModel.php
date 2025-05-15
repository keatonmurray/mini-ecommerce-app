<?php 

namespace App\Models\Attributes;
use App\Config\Database;

abstract class AttributeModel {

    protected $database;

    public function __construct()
    {
        $this->database = (new Database)->connect();
    }
    
    abstract public function attributeType($id);
}