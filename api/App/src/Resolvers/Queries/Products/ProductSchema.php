<?php

namespace App\Resolvers\Queries\Products;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;
use App\Resolvers\Queries\Attributes\Attribute;
use App\Resolvers\Queries\Attributes\SizeSchema;
use App\Controller\Products\AttributesController;
use App\Controller\Products\ProductsController;
use App\Resolvers\Queries\Attributes\CapacitySchema;
use App\Resolvers\Queries\Attributes\ColorSchema;
use App\Controller\Products\CategoriesController;
use App\Resolvers\Queries\Categories\CategorySchema;

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