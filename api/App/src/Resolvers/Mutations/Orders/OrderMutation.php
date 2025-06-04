<?php

namespace App\Resolvers\Mutations\Orders;

use App\Controller\Orders\OrdersController;
use App\Resolvers\MutationSchema;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderMutation extends MutationSchema
{
    public static function getMutationType(): ObjectType
    {
        return new ObjectType([
            'name' => 'OrderMutation',
            'fields' => [
                'cart' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'order_details' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [self::class, 'resolver']
                ],
                'removeItem' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                        'uuid' => Type::nonNull(Type::string())
                    ],
                    'resolve' => [self::class, 'resolver']
                ]
            ]
        ]);
    }

    public static function resolver($root, $args)
    {
        $controller = new OrdersController;

        if (isset($args['order_details'])) {
            $orderDetails = json_decode($args['order_details'], true);
            $controller->addToCart($orderDetails);
            return true;
        }

        $orderId = $args['id'];
        $uuid = $args['uuid'];

        $controller->removeFromCart($orderId, $uuid);
        return true;
    }
}
