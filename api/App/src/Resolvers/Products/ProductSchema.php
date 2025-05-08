<?php

namespace App\Resolvers\Products;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\Products\ProductsController;
use App\Resolvers\BaseSchema;

class ProductSchema extends BaseSchema
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

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function () {
                        $controller = new ProductsController;
                        return $controller->getProducts();
                    }
                ]
            ]
        ]);
    }
}