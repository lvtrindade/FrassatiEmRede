<?php
namespace App\Models;

class Evento {
    public $id;
<<<<<<< HEAD
    public $data_evento;
    public $horario;
=======
    public $data_inicio;
    public $data_fim;
    public $horario_inicio;
    public $horario_fim;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    public $titulo;
    public $descricao;
    public $id_tag;
    public $tag;
    public $cor_tag;

    public function __construct($row) {
        $this->id = $row['id'] ?? null;
<<<<<<< HEAD
        $this->data_evento = $row['data_evento'] ?? null;
        $this->horario = $row['horario'] ?? null;
=======
        $this->data_evento = $row['data_inicio'] ?? null;
        $this->data_evento = $row['data_fim'] ?? null;
        $this->horario = $row['horario_inicio'] ?? null;
        $this->horario = $row['horario_fim'] ?? null;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        $this->titulo = $row['titulo'] ?? null;
        $this->descricao = $row['descricao'] ?? null;
        $this->id_tag = $row['id_tag'] ?? null;
        $this->tag = $row['tag'] ?? null;
<<<<<<< HEAD
        $this->cor_tag = $row['car_tag'] ?? null;
=======
        $this->cor_tag = $row['cor_tag'] ?? null;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    }
}