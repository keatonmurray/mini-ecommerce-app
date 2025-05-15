<?php 

namespace App\Models\Products;
use App\Config\Database;


class Attribute
{
    private $database;

    public function __construct()
    {
        $this->database = (new Database)->connect();
    }

    protected function attributes($id)
    {
        $query = "SELECT 
            attributes.name AS attribute_name,
            attribute_values.value AS attribute_value,
            attribute_values.display_value As attribute_display_value,
            products.id AS product_slug,
            products.gallery,
            products.name AS product_name,
            products.description,
            prices.amount,
            prices.currency
            FROM attributes 
            INNER JOIN products 
            ON attributes.product_id = products.id
            INNER JOIN attribute_values 
            ON attribute_values.attribute_id = attributes.id
            INNER JOIN prices ON prices.product_id = products.id
            WHERE products.id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();

        $attributes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        foreach ($attributes as &$attribute) {
            $attribute['gallery'] = json_decode($attribute['gallery'], true) ?? [];
            $attribute['currency'] = json_decode($attribute['currency'], true) ?? [];    
        }

        return $attributes;
    }

    protected function size($id)
    {
        $query = "SELECT
            attributes.name AS attribute_name,
            attributes.product_id,
            attribute_values.display_value,
            attribute_values.attribute_id,
            attribute_values.value
            FROM attributes
            INNER JOIN 
            attribute_values 
            ON attributes.id = attribute_values.attribute_id
            WHERE attributes.name = 'Size' && product_id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function colors($id)
    {
        $query = "SELECT
            attributes.name AS attribute_name,
            attributes.product_id,
            attribute_values.display_value,
            attribute_values.attribute_id,
            attribute_values.value
            FROM attributes
            INNER JOIN 
            attribute_values 
            ON attributes.id = attribute_values.attribute_id
            WHERE attributes.name = 'Color' && product_id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function capacity($id)
    {
        $query = "SELECT
            attributes.name AS attribute_name,
            attributes.product_id,
            attribute_values.display_value,
            attribute_values.attribute_id,
            attribute_values.value
            FROM attributes
            INNER JOIN 
            attribute_values 
            ON attributes.id = attribute_values.attribute_id
            WHERE attributes.name = 'Capacity' && product_id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function usb($id)
    {
        $query = "SELECT
            attributes.name AS attribute_name,
            attributes.product_id,
            attribute_values.display_value,
            attribute_values.attribute_id,
            attribute_values.value
            FROM attributes
            INNER JOIN 
            attribute_values 
            ON attributes.id = attribute_values.attribute_id
            WHERE attributes.name = 'With USB 3 ports' && product_id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    protected function touchIdKeyboard($id)
    {
        $query = "SELECT
            attributes.name AS attribute_name,
            attributes.product_id,
            attribute_values.display_value,
            attribute_values.attribute_id,
            attribute_values.value
            FROM attributes
            INNER JOIN 
            attribute_values 
            ON attributes.id = attribute_values.attribute_id
            WHERE attributes.name = 'Touch ID in keyboard' && product_id = :id";

        $stmt = $this->database->prepare($query);
        $stmt->bindParam(':id', $id, \PDO::PARAM_STR);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}