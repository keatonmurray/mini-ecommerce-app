<?php 

namespace App\Resolvers;

use GraphQL\Type\Definition\ObjectType;

abstract class MutationSchema 
{

    abstract static function getMutationType(): ObjectType;

    public static function getMutations():ObjectType 
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => []
        ]);
    }

}