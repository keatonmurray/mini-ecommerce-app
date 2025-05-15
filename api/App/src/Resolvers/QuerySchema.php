<?php

namespace App\Resolvers;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Resolvers\Queries\Attributes\Attribute;
use App\Resolvers\Queries\Attributes\SizeSchema;
use App\Resolvers\Queries\Products\ProductSchema;
use App\Controller\Products\AttributesController;
use App\Controller\Products\ProductsController;
use App\Controller\Products\OrdersController;
use App\Resolvers\Queries\Attributes\CapacitySchema;
use App\Resolvers\Queries\Attributes\ColorSchema;
use App\Controller\Products\CategoriesController;
use App\Resolvers\Queries\Categories\CategorySchema;
use App\Resolvers\Queries\Orders\OrderSchema;

abstract class QuerySchema 
{
    abstract static function getObjectType(): ObjectType;
    //might declare another abstract static function for cart items fetching here

    public static function getQuery() : ObjectType {
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(ProductSchema::getObjectType()),
                    'resolve' => function () {
                        $controller = new ProductsController;
                        return $controller->getProducts();
                    }
                ],
                'attributes' => [
                    'type' => Type::listOf(Attribute::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getAttributes($args['product_id']);
                    }
                ],
                'size' => [
                    'type' => Type::listOf(SizeSchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getSize($args['product_id']);
                    }
                ],
                'color' => [
                    'type' => Type::listOf(ColorSchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getColor($args['product_id']);
                    }
                ],
                'capacity' => [
                    'type' => Type::listOf(CapacitySchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getCapacity($args['product_id']);
                    }
                ],
                'usb' => [
                    'type' => Type::listOf(CapacitySchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getUsb($args['product_id']);
                    }
                ],
                'keyboard' => [
                    'type' => Type::listOf(CapacitySchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new AttributesController;
                        return $controller->getTouchIdKeyboard($args['product_id']);
                    }
                ],
                'category' => [
                    'type' => Type::listOf(CategorySchema::getObjectType()),
                    'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new CategoriesController;
                        return $controller->getCategory($args['product_id']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf(CategorySchema::getObjectType()),
                    'resolve' => function () {
                        $controller = new CategoriesController;
                        return $controller->getAllCategories();
                    }
                ]
            ]
        ]);
    
        return $queryType;
    }

    public static function getCartItemsQuery(): ObjectType {
        $queryType = new ObjectType([
            'name' => 'CartQuery',
            'fields' => [
                'orders' => [
                    'type' => Type::listOf(OrderSchema::getObjectType()),
                     'args' => [
                        'product_id' => Type::string()
                    ],
                    'resolve' => function($root, $args) {
                        $controller = new OrdersController;
                        return $controller->getCartItems($args['product_id']);
                    }
                ]
            ]
        ]);

        return $queryType;
    }

     public static function getCartItemsCountQuery(): ObjectType {
        $queryType = new ObjectType([
            'name' => 'CartCount',
            'fields' => [
                'count' => [
                    'type' => Type::listOf(OrderSchema::getCartItemsCountObjectType()),
                    'resolve' => function() {
                        $controller = new OrdersController;
                        return $controller->getCartItemsCount();
                    }
                ],
            ]
        ]);

        return $queryType;
    }

    public static function getMergedQuery(): ObjectType {
        $mainQueryFields = self::getQuery()->config['fields'];
        $cartQueryFields = self::getCartItemsQuery()->config['fields'];
        $cartCountQueryFields = self::getCartItemsCountQuery()->config['fields'];

        return new ObjectType([
            'name' => 'Query',
            'fields' => array_merge(
                $mainQueryFields, 
                $cartQueryFields, 
                $cartCountQueryFields,
            )
        ]);
    }

}