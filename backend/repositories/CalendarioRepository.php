<?php
namespace App\Repositories;

use App\Config\Connection;
use PDO;

class CalendarioRepository {
    private $conn;
    
    public function __construct() {
        $this->conn = Connection::getConnection();
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT e.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Eventos e INNER JOIN Tag t ON e.id_tag = t.id ORDER BY e.data_evento DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById($id) {
        $stmt = $this->conn->prepare("SELECT e.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Eventos e INNER JOIN Tag t ON e.id_tag = t.id WHERE e.id=?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($eventoDTO) {
        $stmt = $this->conn->prepare("INSERT INTO Eventos (data_evento, horario, titulo, descricao, id_tag) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$eventoDTO->data_evento, $eventoDTO->horario, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag]);
        return $this->conn->lastInsertId();
    }

    public function update($id, $eventoDTO) {
        $stmt = $this->conn->prepare("UPDATE Eventos SET data_evento=?, horario=?, titulo=?, descricao=?, id_tag=? WHERE id=?");
        return $stmt->execute([$eventoDTO->data_evento, $eventoDTO->horario, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag, $id]);
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM Eventos WHERE id=?");
        return $stmt->execute([$id]);
    }
}