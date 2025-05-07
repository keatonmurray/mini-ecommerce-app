<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\Products\ProductsController;

class ProductSchema
{
    public static function createSchema()
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
                'name' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'amount' => Type::float(),
                'currency' => $currencyType,
            ]
        ]);

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function() {
                        $getProducts = new ProductsController();
                        return $getProducts->getProducts();
                    }
                ]
            ]
        ]);

        return new \GraphQL\Type\Schema([
            'query' => $queryType,
        ]);
    }
}
