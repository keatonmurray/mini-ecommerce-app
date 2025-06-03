<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Size as SizeModel;

class Size extends AttributesController
{
    public function attributeType($id)
    {
        $model = new SizeModel;
        return $model->attributeType($id);
    }
}