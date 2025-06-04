<?php

namespace App\Resolvers\Queries\Orders;

use App\Controller\Orders\OrdersController;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;

class OrderSchema extends QuerySchema
{
    public static function getObjectType(): ObjectType 
    {
        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ],
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => $currencyType,
            ],
        ]);

        $attributeItemType = new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::string(),
                'value' => Type::string(),
                'selected' => Type::boolean(),
                'display_value' => Type::string(),
            ],
        ]);

        $attributeType = new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf($attributeItemType),
            ],
        ]);

        $orderDetailsType = new ObjectType([
            'name' => 'OrderDetails',
            'fields' => [
                'primary_id' => Type::int(),
                'uuid' => Type::string(),
                'id' => Type::string(),
                'name' => Type::string(),
                'photo' => Type::string(),
                'attrs' => Type::listOf($attributeType),
                'prices' => Type::listOf($priceType),
                'quantity' => Type::int(),
            ],
        ]);

        return new ObjectType([
            'name' => 'Orders',
            'fields' => [
                'order_details' => Type::listOf($orderDetailsType),
            ],
        ]);
    }

    public static function getQueryType(): ObjectType 
    {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'orders' => [
                    'type' => Type::listOf(self::getObjectType()),
                    'resolve' => function ($root, $args) {
                        $controller = new OrdersController;
                        return $orders = $controller->getOrders();
                    }
                ]
            ]
        ]);
    }
}
