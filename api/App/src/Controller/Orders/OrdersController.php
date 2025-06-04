<?php

namespace App\Controller\Orders;
use App\Models\Orders\Order;
use App\Helper\HelperClass;

class OrdersController extends Order
{
    private $instance;

    public function __construct()
    {
        parent::__construct(); 
        $this->instance = new HelperClass;
    }

    public function getOrders()
    {
        $orders = $this->orders();

        foreach ($orders as &$row) {
            $decoded = json_decode($row['order_details'], true);

            $row['order_details'] = is_array($decoded)
                ? $this->instance->sanitizeOrderDetails($decoded, $row['primary_id'])
                : [];
        }

        return $orders;
    }

    public function addToCart(array $orderDetails)
    {
        $existing = $this->getLatestOrder();

        if (!$existing) {
            return $this->cart($orderDetails);
        }

        return $this->instance->mergeAndUpdateExistingOrder($existing, $orderDetails);
    }

    public function removeFromCart($orderId, $uuidToDelete)
    {
        $data = $this->getProductDataByOrderId($orderId);

        if (!$data) return false;

        $filtered = array_filter($data, function ($item) use ($uuidToDelete) {
            return !isset($item['uuid']) || $item['uuid'] !== $uuidToDelete;
        });

        return $this->updateProductDataByOrderId($orderId, array_values($filtered));
    }
}
