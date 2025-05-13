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
                        'product_id' => Type::string(),
                        'quantity' => Type::int(),
                        'total' => Type::float()
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new ProductsController;
                        return $controller->addToCart(
                            $args['product_id'], 
                            $args['quantity'], 
                            $args['total']);
                    }
                ]
            ]
        ]);

        return $productType;
    }
}