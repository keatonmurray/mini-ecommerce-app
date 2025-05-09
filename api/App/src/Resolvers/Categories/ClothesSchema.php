<?php

namespace App\Resolvers\Categories;

use App\Resolvers\BaseSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ClothesSchema extends BaseSchema
{
    public  static function getObjectType(): ObjectType 
    {
        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string()
            ]
            ]);

        $categoryType = new ObjectType ([
            'name' => 'Clothes',
            'fields' => [
                'product_name' => Type::string(),
                'product_id' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'amount' => Type::int(),
                'currency' => $currencyType
            ]
        ]);

        return $categoryType;
    }
}