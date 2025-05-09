<?php

namespace App\Resolvers\Attributes;

use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\BaseSchema;
use GraphQL\Type\Definition\Type;

class TouchIdKeyboardSchema extends BaseSchema
{
    public static function getObjectType(): ObjectType 
    {
        $attributeType = new ObjectType([
            'name' => "Touch ID with Keyboard",
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