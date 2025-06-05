<?php

namespace App\Resolvers\Queries\Attributes;

use App\Controller\Attributes\AttributeTypes\Attributes;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;
use App\Resolvers\Types\CurrencyType; 

class Attribute extends QuerySchema
{
    public static function getObjectType(): ObjectType
    {
        $currencyType = CurrencyType::currency();

        $attributeType = new ObjectType([
            'name' => 'Attributes',
            'fields' => [
                'gallery' => Type::listOf(Type::string()),
                'product_name' => Type::string(),
                'description' => Type::string(),
                'amount' => Type::float(),
                'in_stock' => Type::int(),
                'product_slug' => Type::string(),
                'currency' => $currencyType,
            ],
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
                        'product_id' => Type::string(),
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new Attributes();
                        return $controller->attributeType($args['product_id']);
                    },
                ],
            ],
        ]);
    }
}
