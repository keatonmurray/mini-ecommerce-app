<?php 

namespace App\Resolvers;

use GraphQL\Type\Definition\ObjectType;

abstract class BaseSchema {
    abstract static function getObjectType(): ObjectType;
}