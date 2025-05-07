<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use RuntimeException;
use Throwable;

use App\GraphQL\ProductSchema;

class GraphQL {
    static public function handle() {
        try {

            $schema = self::createProductSchema();

            $rawInput = file_get_contents('php://input');
           
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            
            if (!isset($input['query'])) {
                throw new RuntimeException('No GraphQL query found in request.');
            }

            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];

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
}
