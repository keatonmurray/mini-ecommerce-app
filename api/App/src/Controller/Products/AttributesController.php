<?php

namespace App\Controller\Products;
use App\Models\Products\Attribute;


class AttributesController extends Attribute {
    
    public function getAttributes($id)
    {
        return $this->attributes($id);
    }

    public function getSize()
    {
        return $this->size();
    }
}