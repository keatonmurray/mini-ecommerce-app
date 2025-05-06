<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\ProductsController;

class ProductSchema
{
    public static function createSchema()
    {
        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'price' => Type::float(),
                'description' => Type::string(),
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
