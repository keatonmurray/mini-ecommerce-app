<?php 

    namespace App\Resolvers;
    use GraphQL\Type\Definition\ObjectType;

    abstract class AttributeSchema {
        abstract static function getObjectType(): ObjectType;
    }