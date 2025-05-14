<?php

namespace App\Resolvers\Queries\Products;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;

class ProductSchema extends QuerySchema
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

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'slug' => Type::string(),
                'name' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'amount' => Type::float(),
                'currency' => $currencyType
            ]
        ]);

        return $productType;
    }

    public static function getCartItemsObjectType(): ObjectType
    {
        $productType = new ObjectType([
            'name' => 'Orders',
            'fields' => [
                'products_id' => Type::string(),
                'quantity' => Type::int(),
                'total' => Type::float(),
                'name' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'amount' => Type::float()
            ]
        ]);

        return $productType;
    }

    public static function getCartItemsCountObjectType(): ObjectType
    {
        $productType = new ObjectType([
            'name' => 'CartCount',
            'fields' => [
                'cart_items' => Type::int()
            ]
        ]);

        return $productType;
    }
}