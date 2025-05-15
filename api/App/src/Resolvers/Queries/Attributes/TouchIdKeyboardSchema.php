<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Attributes\AttributesController;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\Type;

class TouchIdKeyboardSchema extends QuerySchema
{
    public static function getObjectType(): ObjectType 
    {
        return new ObjectType([
            'name' => "Touch ID with Keyboard",
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
                'keyboard' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getTouchIdKeyboard($args['product_id']);
                    }
                ],
            ]
        ]);
    }
}