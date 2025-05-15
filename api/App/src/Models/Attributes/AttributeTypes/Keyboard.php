<?php 

namespace App\Models\Attributes\AttributeTypes;
use App\Models\Attributes\AttributeModel;

class Keyboard extends AttributeModel 
{

    public function __construct()
    {
        parent::__construct();
    }

    public function attributeType($id)
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