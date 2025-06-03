<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Attributes\AttributeTypes\Capacity;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CapacitySchema extends QuerySchema
{
    public static function getObjectType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Capacity',
            'fields' => [
                'attribute_name' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'attribute_id' => Type::string(),
                'value' => Type::string()
            ]
        ]);
    }

    public static function getQueryType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'capacity' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new Capacity;
                        return $controller->attributeType($args['product_id']);
                    }
                ]
            ]
        ]);
    }
}