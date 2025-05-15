<?php

namespace App\Resolvers\Queries\Products;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;
use App\Controller\Products\ProductsController;

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

    public static function getQueryType() : ObjectType
    {
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'resolve' => function () {
                        $controller = new ProductsController;
                        return $controller->getProducts();
                    }
                ],
            ]
        ]);
    
        return $queryType;
    }
}