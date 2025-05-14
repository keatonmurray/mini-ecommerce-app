<?php 

namespace App\Resolvers;

use App\Resolvers\Mutations\Orders\OrderMutation;
use GraphQL\Type\Definition\ObjectType;

abstract class MutationSchema 
{

    abstract static function getMutationType(): ObjectType;

    public static function getMutation() {
        return OrderMutation::getMutationType();
    }

    public static function getCartQuantityMutation()
    {
        return OrderMutation::getCartQuantityCountObjectType();
    }

    public static function getCartAddItemMutation()
    {
        return OrderMutation::getCartAddItemObjectType();
    }

    public static function getMergedMutation(): ObjectType {
        $mainMutationFields = self::getMutation()->config['fields'];
        $cartMutationFields = self::getCartQuantityMutation()->config['fields'];
        $cartAddedItemsMutationFields = self::getCartAddItemMutation()->config['fields'];
        
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => array_merge($mainMutationFields, $cartMutationFields, $cartAddedItemsMutationFields)
        ]);
    }

}