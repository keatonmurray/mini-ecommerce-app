<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\Products\AttributesController;

class AttributeSchema
{
    public static function getObjectType(): ObjectType
    {
        $attributeType = new ObjectType([
            'name' => 'Attributes',
            'fields' => [
                'attribute_name' => Type::string(),
                'value' => Type::string(),
                'display_value' => Type::string()
            ]
        ]);

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'attributes' => [
                    'type' => Type::listOf($attributeType),
                    'resolve' => function () {
                        $controller = new AttributesController;
                        return $controller->getAttributes();
                    }
                ]
            ]
        ]);
    }
}