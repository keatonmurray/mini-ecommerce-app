<?php

namespace App\Resolvers\Attributes;
use App\Resolvers\BaseSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class UsbSchema extends BaseSchema 
{
    public static function getObjectType(): ObjectType
    {
        $attributeType = new ObjectType([
            'name' => 'Usb',
            'fields' => [
                'attribute_name' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'attribute_id' => Type::string(),
                'value' => Type::string()
            ]
        ]);

        return $attributeType;
    }
}