<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Attributes\AttributesController;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;

class Attribute extends QuerySchema
{
    public static function getObjectType(): ObjectType
    {   

        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ]
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attributes',
            'fields' => [
                'gallery' => Type::listOf(Type::string()),
                'product_name' => Type::string(),
                'description' => Type::string(),
                'amount' => Type::int(),
                'in_stock' => Type::int(),
                'currency' => $currencyType
            ]
        ]);

        return $attributeType;
    }

    public static function getQueryType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'attributes' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getAttributes($args['product_id']);
                    }
                ]
            ]
        ]);
    }
}