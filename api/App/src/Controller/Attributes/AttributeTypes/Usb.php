<?php

namespace App\Controller\Attributes\AttributeTypes;

use App\Controller\Attributes\AttributesController;
use App\Models\Attributes\AttributeTypes\Usb as UsbModel;

class Usb extends AttributesController
{
    public function attributeType($id)
    {
        $model = new UsbModel;
        return $model->attributeType($id);
    }
}