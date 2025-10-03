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
        $stmt = $this->conn->query(" SELECT a.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Atividade a INNER JOIN Tag t ON a.id_tag = t.id ORDER BY a.data_atividade DESC");
        $atividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($atividades as &$atividade) {
            $stmtGaleria = $this->conn->prepare(" SELECT g.id AS id_galeria, i.id, i.imagem FROM Galeria g LEFT JOIN ImagemGaleria i ON g.id = i.id_galeria WHERE g.id_atividade = ?");
            $stmtGaleria->execute([$atividade['id']]);
            $imagens = $stmtGaleria->fetchAll(PDO::FETCH_ASSOC);

            $atividade['galeria'] = array_map(function ($img) {
                return [
                    'id' => $img['id'],
                    'imagem' => $img['imagem']
                ];
            }, array_filter($imagens, fn($i) => $i['imagem'] !== null));
        }

        return $atividades;
    }

    public function findById($id) {
        $stmt = $this->conn->prepare("SELECT a.*, t.nome AS nome_tag, t.cor AS cor_tag FROM Atividade a INNER JOIN Tag t ON a.id_tag = t.id WHERE a.id = ?");
        $stmt->execute([$id]);
        $atividade = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$atividade) {
            return null;
        }

        $stmt = $this->conn->prepare("SELECT g.id AS id_galeria, i.id, i.imagem FROM Galeria g LEFT JOIN ImagemGaleria i ON g.id = i.id_galeria WHERE g.id_atividade = ?");
        $stmt->execute([$id]);
        $imagens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        $atividade['galeria'] = array_map(function ($img) {
            return [
                'id' => $img['id'],
                'imagem' => $img['imagem']
            ];
        }, array_filter($imagens, fn($i) => $i['imagem'] !== null));

        return $atividade;
    }


    public function create($atividadeDTO) {
        $stmt = $this->conn->prepare("INSERT INTO Atividade (titulo, descricao, imagem_destaque, data_atividade, id_tag) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$atividadeDTO->titulo, $atividadeDTO->descricao, $atividadeDTO->imagem_principal, $atividadeDTO->data_atividade, $atividadeDTO->id_tag]);
        return $this->conn->lastInsertId();
    }

    public function addImagemGaleria($idAtividade, $base64Image) {
        $stmt = $this->conn->prepare("SELECT id FROM Galeria WHERE id_atividade = ?");
        $stmt->execute([$idAtividade]);
        $galeria = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$galeria) {
            throw new \Exception("Galeria não encontrada para a atividade ID: $idAtividade");
        }

        $idGaleria = $galeria['id'];

        $stmt = $this->conn->prepare("INSERT INTO ImagemGaleria (id_galeria, imagem) VALUES (?, ?)");
        $stmt->execute([$idGaleria, $base64Image]);
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