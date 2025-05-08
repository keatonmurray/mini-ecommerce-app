<?php 

namespace App\Resolvers\Attributes;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

use App\Controller\Products\AttributesController;
use App\Resolvers\BaseSchema;


class SizeSchema extends BaseSchema
{
    public static function getObjectType(): ObjectType
    {
        $attributeType = new ObjectType([
            'name' => 'Size',
            'fields' => [
                'attribute_name' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'value' => Type::string(),
                'attribute_id' => Type::int()
            ]
        ]); 

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'size' => [
                    'type' => Type::listOf($attributeType),
                    'resolve' => function () {
                        $controller = new AttributesController;
                        return $controller->getSize();
                    }
                ]
            ]
        ]);

       return $queryType;
    }
}