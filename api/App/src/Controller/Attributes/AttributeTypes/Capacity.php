<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Capacity as CapacityModel;

class Capacity extends AttributesController
{
    public function attributeType($id)
    {
        $model = new CapacityModel;
        return $model->attributeType($id);
    }
}