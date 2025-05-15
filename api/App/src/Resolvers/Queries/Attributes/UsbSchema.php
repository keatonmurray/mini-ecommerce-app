<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Attributes\AttributesController;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class UsbSchema extends QuerySchema 
{
    public static function getObjectType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Usb',
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
                'usb' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getUsb($args['product_id']);
                    }
                ],
            ]
        ]);
    }
}