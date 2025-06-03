<?php

namespace App\Helper;
use App\Models\Orders\Order;

class HelperClass 
{
    private function attributesMatch(array $attrs1, array $attrs2): bool
    {
        $normalize = function (array $attrs): array {
            $result = [];

            foreach ($attrs as $attr) {
                if (empty($attr['id']) || empty($attr['items']) || !is_array($attr['items'])) {
                    continue;
                }

                $selected = [];
                foreach ($attr['items'] as $item) {
                    if (!empty($item['selected'])) {
                        $selected[] = $item['value'];
                    }
                }

                sort($selected);
                $result[$attr['id']] = $selected;
            }

            ksort($result);
            return $result;
        };

        return $normalize($attrs1) === $normalize($attrs2);
    }

    public function mergeAndUpdateExistingOrder(array $existing, array $newOrderDetails)
    {
        $currentItems = json_decode($existing['order_details'], true);

        foreach ($newOrderDetails as $newItem) {
            $foundMatch = false;

            foreach ($currentItems as &$item) {
                if ($item['id'] === $newItem['id'] && $this->attributesMatch($item['attrs'], $newItem['attrs'])) {
                    $item['quantity'] += $newItem['quantity'];
                    $foundMatch = true;
                    break;
                }
            }

            if (!$foundMatch) {
                $currentItems[] = $newItem;
            }
        }

        $updateQuantity = new Order;
        $updateQuantity->updateQuantity($existing['id'], json_encode($currentItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

    public function sanitizeOrderDetails(array $products, $primaryId): array
    {
        foreach ($products as &$product) {
            $product['primary_id'] = $primaryId;
            $product['attrs'] = array_filter($product['attrs'] ?? [], fn($attr) => !empty($attr['items']));
        }

        return $products;
    }
}