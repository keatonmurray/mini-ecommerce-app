<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use RuntimeException;
use Throwable;

use App\GraphQL\ProductSchema;
use App\GraphQL\SingleProductSchema;

class GraphQL {
    static public function handle() {
        try {
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
    
            $query = $input['query'] ?? '';
            $variableValues = $input['variables'] ?? null;
    
            $rootValue = ['prefix' => 'You said: '];
    
            if (strpos($query, 'products') !== false) {
                $schema = self::createProductSchema();
            } elseif (strpos($query, 'singleProduct') !== false) {
                $schema = self::createSingleProductSchema();
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

    private static function createProductSchema()
    {
        return ProductSchema::createSchema(); 
    }

    private static function createSingleProductSchema()
    {
        return SingleProductSchema::createSchema(); 
    }
}
