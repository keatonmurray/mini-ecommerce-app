<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Keyboard as KeyboardModel;

class Keyboard extends AttributesController
{
    public function attributeType($id)
    {
        $model = new KeyboardModel;
        return $model->attributeType($id);
    }
}