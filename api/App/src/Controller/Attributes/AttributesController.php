<?php

namespace App\Controller\Attributes;
use App\Models\Attributes\AttributeTypes\Attribute;
use App\Models\Attributes\AttributeTypes\Capacity;
use App\Models\Attributes\AttributeTypes\Colors;
use App\Models\Attributes\AttributeTypes\Keyboard;
use App\Models\Attributes\AttributeTypes\Size;
use App\Models\Attributes\AttributeTypes\Usb;

class AttributesController {
    
    public function getAttributes($id)
    {
        $model = new Attribute;
        return $model->attributeType($id);
    }

    public function getSize($id)
    {
        $model = new Size;
        return $model->attributeType($id);
    }

    public function getColor($id) 
    {
        $model = new Colors;
        return $model->attributeType($id);
    }

    public function getCapacity($id)
    {
        $model = new Capacity;
        return $model->attributeType($id);
    }

    public function getUsb($id)
    {
        $model = new Usb;
        return $model->attributeType($id);
    }

    public function getTouchIdKeyboard($id)
    {
        $model = new Keyboard;
        return $model->attributeType($id);
    }
}