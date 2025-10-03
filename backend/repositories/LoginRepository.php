<?php
namespace App\Repositories;

use PDO;

use App\Config\Connection;

class LoginRepository {
    private $conn;

    public function __construct() {
        $this->conn = Connection::getConnection();
    }

    public function buscarPorUsuario($usuario) {
        $stmt = $this->conn->prepare("SELECT * FROM Usuario WHERE usuario = ?");
        $stmt->execute([$usuario]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}