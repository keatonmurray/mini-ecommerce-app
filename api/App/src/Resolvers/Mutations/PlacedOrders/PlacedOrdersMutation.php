<?php

namespace App\Resolvers\Mutations\PlacedOrders;

use App\Controller\PlacedOrders\PlacedOrdersController;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\MutationSchema;
use GraphQL\Type\Definition\Type;

class PlacedOrdersMutation extends MutationSchema
{
    public static function getMutationType(): ObjectType
    {
        return new ObjectType([
            'name' => 'PlacedOrdersMutation',
            'fields' => [
                'placed_order' => [
                    'type' => Type::int(),
                    'args' => [
                        'quantity' => Type::nonNull(Type::int()),
                        'order_id' => Type::nonNull(Type::int())
                    ],
                    'resolve' => [self::class, 'resolver']
                ]
            ]
        ]);
    }

    public static function resolver($root, $args)
    {
        $controller = new PlacedOrdersController;
        $controller->complete_order($args['quantity'], $args['order_id']);
    }
}
