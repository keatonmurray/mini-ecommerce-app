<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Colors as ColorModel;

class Color extends AttributesController
{
    public function attributeType($id)
    {
        $model = new ColorModel;
        return $model->attributeType($id);
    }
}