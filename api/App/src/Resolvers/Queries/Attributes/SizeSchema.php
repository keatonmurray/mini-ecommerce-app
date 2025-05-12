<?php 

namespace App\Resolvers\Queries\Attributes;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;

class SizeSchema extends QuerySchema
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

       return $attributeType;
    }

}