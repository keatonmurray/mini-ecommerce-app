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

    protected function attributes()
    {
        $query = "SELECT 
        attributes.name AS attribute_name,
        attribute_values.value,
        attribute_values.display_value
        FROM attributes 
        INNER JOIN attribute_values
        ON attributes.id = attribute_values.attribute_id";

        $stmt = $this->database->prepare($query);
        $stmt->execute();
        $attributes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $attributes;
    }
}