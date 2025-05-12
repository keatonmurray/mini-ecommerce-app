<?php 

namespace App\Resolvers;

use App\Resolvers\Mutations\Orders\OrderMutation;
use GraphQL\Type\Definition\ObjectType;

abstract class MutationSchema 
{

    abstract static function getMutationType(): ObjectType;

    public function getMutation() {
        return OrderMutation::getMutationType();
    }
}