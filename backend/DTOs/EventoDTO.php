<?php
namespace App\DTOs;

class EventoDTO {
    public $titulo;
    public $descricao;
    public $data_evento;
    public $horario;
    public $id_tag;
    public $data;

    public function __construct($data) {
        $this->$titulo = $data['titulo'] ?? null;
        $this->$descricao = $data['descricao'] ?? null;
        $this->$data_evento = $data['data_evento'] ?? null;
        $this->$horario = $data['horario'] ?? null;
        $this->$id_tag = $data['ramo'] ?? null;
    }

    public function isValid() {
        return $this->titulo && $this->descricao && $this->data_evento && $this->horario && $this->id_tag;
    }
}