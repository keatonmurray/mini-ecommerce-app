<?php

namespace App\Controller\Attributes;
use App\Models\Attributes\Attribute;

class AttributesController extends Attribute {
    
    public function getAttributes($id)
    {
        return $this->attributes($id);
    }

    public function getSize($id)
    {
        return $this->size($id);
    }

    public function getColor($id) 
    {
        return $this->colors($id);
    }

    public function getCapacity($id)
    {
        return $this->capacity($id);
    }

    public function getUsb($id)
    {
        return $this->usb($id);
    }

    public function getTouchIdKeyboard($id)
    {
        return $this->touchIdKeyboard($id);
    }
}