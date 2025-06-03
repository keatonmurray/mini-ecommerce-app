<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Attribute;

class Attributes extends AttributesController
{
    public function attributeType($id)
    {
        $model = new Attribute();
        return $model->attributeType($id);
    }
}