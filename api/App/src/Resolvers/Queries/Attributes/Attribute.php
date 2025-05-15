<?php

namespace App\Resolvers\Queries\Attributes;

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
            'name' => 'AttributeType',
            'fields' => [
                'attribute' => Type::listOf(Type::string()) 
            ]
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attributes',
            'fields' => [
                'gallery' => Type::listOf(Type::string()),
                'product_name' => Type::string(),
                'description' => Type::string(),
                'amount' => Type::int(),
                'currency' => $currencyType,
                'selected_attributes' => $attributeType
            ]
        ]);

        return $attributeType;
    }
}