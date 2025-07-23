<?php
namespace App\Repositories;

use PDO;

use App\Config\Connection;

class AtividadeRepository {
    private $conn;

    public function __construct() {
        $this->conn = Connection::getConnection();
    }

    public function getAll() {
        $stmt = $this->conn->query("SELECT a.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Atividade a INNER JOIN Tag t ON a.id_tag = t.id ORDER BY a.data_atividade DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findById($id) {
        $stmt = $this->conn->prepare("SELECT a.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Atividade a INNER JOIN Tag t ON a.id_tag = t.id WHERE a.id=?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($atividadeDTO) {
        $stmt = $this->conn->prepare("INSERT INTO Atividade (titulo, descricao, imagem_destaque, data_atividade, id_tag) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$atividadeDTO->titulo, $atividadeDTO->descricao, $atividadeDTO->imagem_principal, $atividadeDTO->data_atividade, $atividadeDTO->id_tag]);
        return $this->conn->lastInsertId();
    }

    public function update($id, $atividadeDTO) {
        if ($atividadeDTO->imagem_principal) {
            $stmt = $this->conn->prepare("UPDATE Atividade SET titulo=?, descricao=?, imagem_destaque=?, data_atividade=?, id_tag=? WHERE id=?");
            return $stmt->execute([
                $atividadeDTO->titulo,
                $atividadeDTO->descricao,
                $atividadeDTO->imagem_principal,
                $atividadeDTO->data_atividade,
                $atividadeDTO->id_tag,
                $id
            ]);
        } else {
            $stmt = $this->conn->prepare("UPDATE Atividade SET titulo=?, descricao=?, data_atividade=?, id_tag=? WHERE id=?");
            return $stmt->execute([
                $atividadeDTO->titulo,
                $atividadeDTO->descricao,
                $atividadeDTO->data_atividade,
                $atividadeDTO->id_tag,
                $id
            ]);
        }
    }


    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM Atividade WHERE id=?");
        return $stmt->execute([$id]);
    }

    public function criarGaleriaParaAtividade($idAtividade) {
        $stmt = $this->conn->prepare("INSERT INTO Galeria (id_atividade) VALUES (?)");
        $stmt->execute([$idAtividade]);
    }
}