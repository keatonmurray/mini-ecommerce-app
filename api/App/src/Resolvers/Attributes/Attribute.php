<?php

namespace App\Resolvers\Attributes;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\BaseSchema;

class Attribute extends BaseSchema
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
                'currency' => $currencyType
            ]
        ]);

        return $attributeType;
    }
}