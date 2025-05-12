<?php

namespace App\Resolvers\Mutations\Orders;

use App\Resolvers\MutationSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Controller\Products\ProductsController;

class OrderMutation extends MutationSchema {

    public static function getMutationType(): ObjectType {

        $productType = new ObjectType([
            'name' => 'Orders',
            'fields' => [
                'orders' => [
                    'type' => Type::string(),
                    'args' => [
                        'order_details' => Type::string(),
                        'order_status' => Type::string(),
                        'total' => Type::float()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new ProductsController;
                        return $controller->addToCart($args['order_details'], $args['order_status'], $args['total']);
                    }
                ]
            ]
        ]);

        return $productType;
    }
}