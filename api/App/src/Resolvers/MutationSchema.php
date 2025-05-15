<?php 

namespace App\Resolvers;

use App\Resolvers\Mutations\Orders\OrderMutation;
use GraphQL\Type\Definition\ObjectType;

abstract class MutationSchema 
{

    // abstract static function getMutationType(): ObjectType;

    public static function getMutation() {
        return OrderMutation::getMutationType();
    }

    public static function getMergedMutation(): ObjectType {
        
        return new ObjectType([
            'name' => 'Mutation',
        ]);
    }

}