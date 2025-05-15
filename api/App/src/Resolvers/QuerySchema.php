<?php

namespace App\Resolvers;

use App\Resolvers\Queries\Products\ProductSchema;
use App\Resolvers\Queries\Attributes\Attribute;
use App\Resolvers\Queries\Attributes\CapacitySchema;
use App\Resolvers\Queries\Attributes\ColorSchema;
use App\Resolvers\Queries\Attributes\SizeSchema;
use App\Resolvers\Queries\Attributes\TouchIdKeyboardSchema;
use App\Resolvers\Queries\Attributes\UsbSchema;
use App\Resolvers\Queries\Categories\CategorySchema;
use GraphQL\Type\Definition\ObjectType;

abstract class QuerySchema 
{
    abstract static function getObjectType(): ObjectType;
    abstract static function getQueryType(): ObjectType;

    public static function getQueries(): ObjectType 
    {
        $schemas = [
            ProductSchema::getQueryType(),
            Attribute::getQueryType(),
            SizeSchema::getQueryType(),
            ColorSchema::getQueryType(),
            CapacitySchema::getQueryType(),
            UsbSchema::getQueryType(),
            TouchIdKeyboardSchema::getQueryType(),
            CategorySchema::getQueryType()
        ];

        $allFields = array_reduce($schemas, function ($carry, $schema) {
            return array_merge($carry, $schema->config['fields']);
        }, []);

        return new ObjectType([
            'name' => 'Query',
            'fields' => $allFields
        ]);
    }
}