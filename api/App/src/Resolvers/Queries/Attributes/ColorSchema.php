<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Products\AttributesController;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ColorSchema extends QuerySchema
{
    public static function getObjectType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Color',
            'fields' => [
                'attribute_name' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'value' => Type::string(),
                'attribute_id' => Type::int()
            ]
        ]);

    }

    public static function getQueryType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'color' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getColor($args['product_id']);
                    }
                ]
            ]
        ]);
    }
}