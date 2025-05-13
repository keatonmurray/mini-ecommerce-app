<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use Throwable;
use GraphQL\Type\Definition\ObjectType;
use App\Resolvers\QuerySchema;
use App\Resolvers\MutationSchema;

class GraphQL {
    public static function handle() {
        try {
            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);

            $query = $input['query'] ?? '';
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];

            $queryType = QuerySchema::getMergedQuery();
            $mutationType = MutationSchema::getMutation();

            $schema = self::createSchema($queryType, $mutationType);

            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray(true);

        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }

    private static function createSchema(ObjectType $queryType, ObjectType $mutationType): Schema
    {
        return new Schema([
            'query' => $queryType,
            'mutation' => $mutationType
        ]);
    }
}
