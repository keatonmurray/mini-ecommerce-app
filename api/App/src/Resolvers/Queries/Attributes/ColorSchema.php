<?php

namespace App\Resolvers\Queries\Attributes;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ColorSchema extends QuerySchema
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