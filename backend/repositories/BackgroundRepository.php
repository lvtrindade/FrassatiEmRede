<?php
namespace App\Repositories;

use PDO;

use App\Config\Connection;

class BackgroundRepository {
    private $conn;

    public function __construct() {
        $this->conn = Connection::getConnection();
    }

    public function buscarPorId($id) {
        $stmt = $this->conn->prepare("SELECT * FROM Background WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function atualizarImagem($id, $base64) {
        $stmt = $this->conn->prepare("UPDATE Background SET imagem = ? WHERE id = ?");
        $stmt->execute([$base64, $id]);
    }

    public function inserirImagemComId($id, $base64) {
        $stmt = $this->conn->prepare("INSERT INTO Background (id, imagem) VALUES (?, ?)");
        $stmt->execute([$id, $base64]);
    }
}