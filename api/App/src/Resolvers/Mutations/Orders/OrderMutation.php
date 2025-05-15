<?php

namespace App\Resolvers\Mutations\Orders;

use App\Resolvers\MutationSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Controller\Products\ProductsController;
use App\Controller\Products\OrdersController;


class OrderMutation extends MutationSchema {

    public static function getMutationType() {

    }

     public static function getCartQuantityCountObjectType(): ObjectType{
        $productType = new ObjectType([
            'name' => 'CartQuantity',
            'fields' => [
                'cart_quantity' => [
                    'type' => Type::string(),
                    'args' => [
                        'products_id' => Type::string(),
                        'quantity' => Type::int()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new OrdersController;
                        return $controller->getCartQuantityCount(
                            $args['quantity'],
                            $args['products_id']
                        );
                    }
                ]
            ]
        ]);

        return $productType;
    }
}