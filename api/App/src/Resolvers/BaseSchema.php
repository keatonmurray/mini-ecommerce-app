<?php 

namespace App\Resolvers;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Resolvers\Attributes\Attribute;
use App\Resolvers\Attributes\SizeSchema;
use App\Resolvers\Products\ProductSchema;
use App\Controller\Products\AttributesController;
use App\Controller\Products\ProductsController;
use App\Resolvers\Attributes\ColorSchema;

abstract class BaseSchema {
    abstract static function getObjectType(): ObjectType;

    public static function getQueryType(): ObjectType {
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
                ]
            ]
        ]);
    
        return $queryType;
    }
}