<?php

namespace App\Controller\Validation;
use App\Models\Orders\Order;

class ValidationController 
{
    private function hasExistingOrder()
    {
        $orders = new Order;
        return $orders->getLatestOrder();
    }

    public function orderExists($orderDetails)
    {
        $newItem = $orderDetails[0];
        $order = $this->hasExistingOrder();

        if ($order) {
            $decodedItems = json_decode($order['order_details'], true);

            foreach ($decodedItems as $existingItem) {
                if ($existingItem['id'] !== $newItem['id']) {
                    continue;
                }

                $existingAttrs = $this->getSelectedAttributes($existingItem['attrs']);
                $newAttrs = $this->getSelectedAttributes($newItem['attrs']);

                if ($existingAttrs == $newAttrs) {
                    return true;
                }
            }
        }
        return false;
    }

    public function getSelectedAttributes($attrs)
    {
        $selectedAttrs = [];

        foreach ($attrs as $attr) {
            foreach ($attr['items'] as $item) {
                if (isset($item['selected']) && $item['selected'] === true) {
                    $selectedAttrs[$attr['id']] = $item['value'];
                }
            }
        }

        return $selectedAttrs;
    }

    public function decodeAndUpdateQuantity($orderDetails)
    {
        $newItem = $orderDetails[0];
        $order = $this->hasExistingOrder();

        $orderId = $order['id'];
        $existingItems = json_decode($order['order_details'], true);
        
        foreach ($existingItems as &$existingItem) {
            if ($existingItem['id'] !== $newItem['id']) {
                continue;
            }

            $existingAttrs = $this->getSelectedAttributes($existingItem['attrs']);
            $newAttrs = $this->getSelectedAttributes($newItem['attrs']);

            if ($existingAttrs == $newAttrs) {
                $existingItem['quantity'] += $newItem['quantity'];

                $updatedJson = json_encode($existingItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                $model = new Order; 
                return $model->updateQuantity($orderId, $updatedJson);
            }
        }

        return false;
    }
}