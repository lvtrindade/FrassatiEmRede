<?php
namespace App\Repositories;

use PDO;

use App\Config\Connection;

class TagRepository {
    private $conn;

    public function __construct() {
        $this->conn = Connection::getConnection();
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT id, nome, cor FROM Tag ORDER BY id ASC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}