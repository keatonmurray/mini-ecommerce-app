<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\Products\AttributesController;

class AttributeSchema {
    
    public static function createSchema()
    {
        $productType = new ObjectType([
            'name' => 'Attributes',
            'fields' => [
                'attribute_name' => Type::string(),
                'value' => Type::string(),
                'display_value' => Type::string()
            ]
        ]);

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'attributes' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function() {
                        $getAttribute = new AttributesController;
                        return $getAttribute->getAttributes();
                    }
                ]
            ]
        ]);

        return new \GraphQL\Type\Schema([
            'query' => $queryType
        ]);
    }
}