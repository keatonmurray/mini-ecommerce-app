<?php

namespace App\Config;

include_once __DIR__ . '/DbCredentials.php';

use PDO;
use PDOException;
use Exception;

class Database {
    private $connection;
    private $host;
    private $user;
    private $password;
    private $dbName;

    public function __construct() {
        $this->host = DB_HOST;
        $this->user = DB_USER;
        $this->password = DB_PASS;
        $this->dbName = DB_NAME;
    }

    public function connect() {
        $dsn = "mysql:host={$this->host};dbname={$this->dbName};charset=utf8mb4";

        try {
            $this->connection = new PDO($dsn, $this->user, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->connection;
        } catch (PDOException $e) {
            throw new Exception("PDO connection failed: " . $e->getMessage());
        }
    }

    public function close() {
        $this->connection = null;
    }

    public function prepare($query) {
        return $this->connection->prepare($query);
    }

    public function beginTransaction() {
        return $this->connection->beginTransaction();
    }

    public function commit() {
        return $this->connection->commit();
    }

    public function rollBack() {
        return $this->connection->rollBack();
    }

    public function getConnection() {
        return $this->connection;
    }
}
