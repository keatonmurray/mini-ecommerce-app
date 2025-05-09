<?php

namespace App\Resolvers\Attributes;
use App\Resolvers\BaseSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ColorSchema extends BaseSchema
{
    public static function getObjectType(): ObjectType
    {
        $attributeType = new ObjectType([
            'name' => 'Color',
            'fields' => [
                'attribute_name' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'value' => Type::string(),
                'attribute_id' => Type::int()
            ]
        ]);

        return $attributeType;
    }
}