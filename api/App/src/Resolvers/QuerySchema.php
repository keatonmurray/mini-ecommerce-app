<?php

namespace App\Resolvers;

class QuerySchema 
{
    public static function getQuery() 
    {
        return BaseSchema::getQueryType();
    }
}