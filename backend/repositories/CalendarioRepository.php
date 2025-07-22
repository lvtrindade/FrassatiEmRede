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
<<<<<<< HEAD
        $stmt = $this->conn->query("SELECT e.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Eventos e INNER JOIN Tag t ON e.id_tag = t.id ORDER BY e.data_evento DESC");
=======
        $stmt = $this->conn->query("SELECT e.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Eventos e INNER JOIN Tag t ON e.id_tag = t.id ORDER BY e.data_inicio ASC, e.horario_inicio ASC");
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById($id) {
        $stmt = $this->conn->prepare("SELECT e.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Eventos e INNER JOIN Tag t ON e.id_tag = t.id WHERE e.id=?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($eventoDTO) {
<<<<<<< HEAD
        $stmt = $this->conn->prepare("INSERT INTO Eventos (data_evento, horario, titulo, descricao, id_tag) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$eventoDTO->data_evento, $eventoDTO->horario, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag]);
=======
        $stmt = $this->conn->prepare("INSERT INTO Eventos (data_inicio, data_fim, horario_inicio, horario_fim, titulo, descricao, id_tag) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$eventoDTO->data_inicio, $eventoDTO->data_fim, $eventoDTO->horario_inicio, $eventoDTO->horario_fim, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag]);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        return $this->conn->lastInsertId();
    }

    public function update($id, $eventoDTO) {
<<<<<<< HEAD
        $stmt = $this->conn->prepare("UPDATE Eventos SET data_evento=?, horario=?, titulo=?, descricao=?, id_tag=? WHERE id=?");
        return $stmt->execute([$eventoDTO->data_evento, $eventoDTO->horario, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag, $id]);
=======
        $stmt = $this->conn->prepare("UPDATE Eventos SET data_inicio=?, data_fim=?, horario_inicio=?, horario_fim=?, titulo=?, descricao=?, id_tag=? WHERE id=?");
        return $stmt->execute([$eventoDTO->data_inicio, $eventoDTO->data_fim, $eventoDTO->horario_inicio, $eventoDTO->horario_fim, $eventoDTO->titulo, $eventoDTO->descricao, $eventoDTO->id_tag, $id]);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM Eventos WHERE id=?");
        return $stmt->execute([$id]);
    }
}