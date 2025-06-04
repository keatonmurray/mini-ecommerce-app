<?php

namespace App\Resolvers\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class CurrencyType 
{
    private static $currency;

    public static function currency(): ObjectType
    {
        if (self::$currency === null) {
            self::$currency = new ObjectType([
                'name' => 'Currency',
                'fields' => [
                    'label' => Type::string(),
                    'symbol' => Type::string(),
                ],
            ]);
        }
        return self::$currency;
    }

}