<?php

namespace App\Resolvers\Mutations\Orders;

use App\Resolvers\MutationSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Controller\Products\ProductsController;
use App\Controller\Products\OrdersController;


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
                        $controller = new OrdersController;
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

    public static function getCartAddItemObjectType(): ObjectType 
    {
        $productType = new ObjectType([
            'name' => 'AddToCart',
            'fields' => [
                'add_to_cart' => [
                    'type' => Type::string(),
                    'args' => [
                        'products_id' => Type::string(),
                        'quantity' => Type::int(),
                        'item_price' => Type::float(),
                        'selected_attributes' => Type::nonNull(Type::listOf(Type::string())),
                    ],
                    'resolve' => function ($root, $args) {
                        $controller = new OrdersController;
                        return $controller->addSelectedProductsToCart(
                            $args['products_id'],
                            $args['selected_attributes']
                        );
                    }
                ]
            ]
        ]);

        return $productType;
    }
}