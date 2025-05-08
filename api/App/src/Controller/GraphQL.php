<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use Throwable;
use GraphQL\Type\Definition\ObjectType;

use App\GraphQL\ProductSchema;
use App\GraphQL\SingleProductSchema;
use App\GraphQL\AttributeSchema;

class GraphQL {
    static public function handle() {
        try {
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
    
            $query = $input['query'] ?? '';
            $variableValues = $input['variables'] ?? null;
    
            $rootValue = ['prefix' => 'You said: '];
    
            if (strpos($query, 'products') !== false) {
                $queryType = ProductSchema::getObjectType();
                $schema = self::createProductSchema($queryType);
            } elseif (strpos($query, 'attributes') !== false) {
                $queryType = AttributeSchema::getObjectType();
                $schema = self::createAttributeSchema($queryType);
            } else {
                throw new \Exception("No matching schema found in query.");
            }
    
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
    
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }
    
        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }

    private static function createProductSchema(ObjectType $queryType): Schema
    {
        return new Schema([
            'query' => $queryType,
        ]);
    }

    private static function createSingleProductSchema(ObjectType $queryType): Schema
    {
        return new Schema([
            'query' => $queryType,
        ]);
    }

    private static function createAttributeSchema(ObjectType $queryType): Schema 
    {
        return new Schema([
            'query' => $queryType
        ]);
    }
}
