<?php
namespace App\Models;

class Evento {
    public $id;
    public $data_inicio;
    public $data_fim;
    public $horario_inicio;
    public $horario_fim;
    public $titulo;
    public $descricao;
    public $id_tag;
    public $tag;
    public $cor_tag;

    public function __construct($row) {
        $this->id = $row['id'] ?? null;
        $this->data_evento = $row['data_inicio'] ?? null;
        $this->data_evento = $row['data_fim'] ?? null;
        $this->horario = $row['horario_inicio'] ?? null;
        $this->horario = $row['horario_fim'] ?? null;
        $this->titulo = $row['titulo'] ?? null;
        $this->descricao = $row['descricao'] ?? null;
        $this->id_tag = $row['id_tag'] ?? null;
        $this->tag = $row['tag'] ?? null;
        $this->cor_tag = $row['cor_tag'] ?? null;
    }
}