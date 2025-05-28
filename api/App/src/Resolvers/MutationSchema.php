<?php 

namespace App\Resolvers;

use App\Resolvers\Mutations\Orders\OrderMutation;
use App\Resolvers\Mutations\PlacedOrders\PlacedOrdersMutation;
use GraphQL\Type\Definition\ObjectType;

abstract class MutationSchema 
{
    abstract static function resolver($root, $args);
    abstract static function getMutationType();

    public static function getMutations(): ObjectType 
    {
        $schemas = [
            OrderMutation::getMutationType(),
            PlacedOrdersMutation::getMutationType()
        ];

        $allFields = array_reduce($schemas, function ($carry, $schema) {
            return array_merge($carry, $schema->config['fields']);
        }, []);

        return new ObjectType([
            'name' => 'Mutation',
            'fields' => $allFields
        ]);
    }
}