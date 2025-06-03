<?php

namespace App\Controller\Orders;
use App\Models\Orders\Order;

class OrdersController extends Order
{
    public function getOrders()
    {
        $orderDetails = $this->orders();

        foreach ($orderDetails as &$row) {
            $decoded = json_decode($row['order_details'], true);

            if (!is_array($decoded)) {
                $row['order_details'] = [];
                continue;
            }

            $newDetails = [];

            foreach ($decoded as $product) {
                $product['primary_id'] = $row['primary_id'];

                if (isset($product['attrs']) && is_array($product['attrs'])) {
                    $product['attrs'] = array_filter($product['attrs'], function ($attr) {
                        return !empty($attr['items']);
                    });
                }

                $newDetails[] = $product;
            }

            $row['order_details'] = $newDetails;
        }

        return $orderDetails;
    }


    public function addToCart($orderDetails)
    {   
        $existingOrder = $this->getLatestOrder();
        $newItem = $orderDetails[0];

        if (!$existingOrder) {
            return $this->cart($orderDetails);
        }

        $currentItems = json_decode($existingOrder['order_details'], true);
        $matched = false;

        foreach ($currentItems as &$item) {
            if (
                $item['id'] === $newItem['id'] &&
                json_encode($item['attrs']) === json_encode($newItem['attrs'])
            ) {
                $item['quantity'] += $newItem['quantity'];
                $matched = true;
                break;
            }
        }

        if (!$matched) {
            $currentItems[] = $newItem;
        }

        $updatedJson = json_encode($currentItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return $this->updateQuantity($existingOrder['id'], $updatedJson);
    }

    public function removeFromCart($id) 
    {
        return $this->removeItem($id);
    }
}
