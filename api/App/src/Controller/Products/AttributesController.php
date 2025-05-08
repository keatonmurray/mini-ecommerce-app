<?php

namespace App\Controller\Products;
use App\Models\Products\Attribute;


class AttributesController extends Attribute {
    
    public function getAttributes()
    {
        return $this->attributes();
    }
}