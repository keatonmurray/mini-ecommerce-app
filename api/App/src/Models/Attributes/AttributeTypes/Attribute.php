<?php 

namespace App\Models\Attributes\AttributeTypes;
use App\Models\Attributes\AttributeModel;

class Attribute extends AttributeModel
{
    public function __construct()
    {
        parent::__construct();
    }

    public function attributeType($id)
    {
        $query = "SELECT 
            attributes.name AS attribute_name,
            attribute_values.value AS attribute_value,
            attribute_values.display_value As attribute_display_value,
            products.id AS product_slug,
            products.gallery,
            products.name AS product_name,
            products.description,
            products.in_stock,
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
}