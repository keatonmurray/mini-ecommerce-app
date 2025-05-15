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

    public static function getProductQuery(): ObjectType 
    {
        return ProductSchema::getQueryType();
    }

    public static function getAttributeQuery(): ObjectType 
    {
        return Attribute::getQueryType();
    }

    public static function getSizeQuery(): ObjectType
    {
        return SizeSchema::getQueryType();
    }

    public static function getColorQuery(): ObjectType
    {
        return ColorSchema::getQueryType();
    }

    public static function getCapacityQuery(): ObjectType 
    {
        return CapacitySchema::getQueryType();
    }

    public static function getUsbQuery(): ObjectType
    {
        return UsbSchema::getQueryType();
    }

    public static function getKeyboardQuery(): ObjectType 
    {
        return TouchIdKeyboardSchema::getQueryType();
    }

    public static function getCategorySchema(): ObjectType
    {
        return CategorySchema::getQueryType();
    }

    public static function getMergedQuery(): ObjectType 
    {
        $schemas = [
            self::getProductQuery(),
            self::getAttributeQuery(),
            self::getSizeQuery(),
            self::getColorQuery(),
            self::getCapacityQuery(),
            self::getUsbQuery(),
            self::getKeyboardQuery(),
            self::getCategorySchema()
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