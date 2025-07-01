<?php
namespace App\Models;

class Evento {
    public $id;
    public $data_evento;
    public $horario;
    public $titulo;
    public $descricao;
    public $id_tag;
    public $tag;
    public $cor_tag;

    public function __construct($row) {
        $this->id = $row['id'] ?? null;
        $this->data_evento = $row['data_evento'] ?? null;
        $this->horario = $row['horario'] ?? null;
        $this->titulo = $row['titulo'] ?? null;
        $this->descricao = $row['descricao'] ?? null;
        $this->id_tag = $row['id_tag'] ?? null;
        $this->tag = $row['tag'] ?? null;
        $this->cor_tag = $row['car_tag'] ?? null;
    }
}