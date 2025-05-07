<?php
namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Controller\Products\ProductsController;

class SingleProductSchema 
{
    public static function createSchema()
    {
        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ]
        ]);

        $productType = new ObjectType([
            'name' => 'SingleProduct',
            'fields' => [
                'product_name' => Type::string(),
                'product_id' => Type::string(),
                'attribute_name' => Type::string(),
                'value' => Type::string(),
                'amount' => Type::float(),
                'currency' => $currencyType
            ]
        ]);

        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'singleProduct' => [
                    'type' => Type::listOf($productType),
                    'args' => [ 
                        'product_id' => Type::string()
                    ],
                    'resolve' => function($root, $args) { 
                        $getSingleProduct = new ProductsController;
                        return $getSingleProduct->showSingleProduct($args['product_id']);
                    }
                ]
            ]
        ]);

        return new \GraphQL\Type\Schema([
            'query' => $queryType,
        ]);
    }
}