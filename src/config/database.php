<?php

return [
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'dbname' => getenv('DB_NAME') ?: 'scandiweb_ecommerce_task',
    'port' => getenv('DB_PORT') ?: '3306',
    'charset' => 'utf8mb4',
    'user' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASS') ?: 'Webdev@26',
];
