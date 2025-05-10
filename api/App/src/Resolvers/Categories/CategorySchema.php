<?php

namespace App\Resolvers\Categories;

use App\Resolvers\BaseSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategorySchema extends BaseSchema
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
            'name' => 'Category',
            'fields' => [
                'product_name' => Type::string(),
                'product_id' => Type::string(),
                'amount' => Type::float(),
                'category_name' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'currency' => $currencyType
            ]
        ]);

        return $categoryType;
    }
}