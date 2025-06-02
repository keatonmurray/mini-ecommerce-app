<?php

namespace App\Resolvers\Queries\Categories;

use App\Controller\Categories\CategoriesController;
use App\Resolvers\QuerySchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategorySchema extends QuerySchema
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
                'in_stock' => Type::int(),
                'currency' => $currencyType
            ]
        ]);

        return $categoryType;
    }

    public static function getCategories(): ObjectType
    {
        return new ObjectType([
            'name' => 'CategoryBasic',
            'fields' => [
                'category_name' => Type::string(),
                'product_id' => Type::int()
            ]
        ]);
    }

    public static function getQueryType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'category' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new CategoriesController;
                        return $controller->getCategory($args['product_id']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf(self::getCategories()),
                    'resolve' => function() {
                        $controller = new CategoriesController;
                        return $controller->getAllCategories();
                    }
                ]
            ]
        ]);
    }
}