<?php
namespace App\DTOs;

class EventoDTO {
    public $titulo;
    public $descricao;
    public $data_inicio;
    public $data_fim;
    public $horario_inicio;
    public $horario_fim;
    public $id_tag;
    public $data;

    public function __construct($data) {
        $this->titulo = $data['titulo'] ?? null;
        $this->descricao = $data['descricao'] ?? null;
        $this->data_inicio = $data['data_inicio'] ?? null;
        $this->data_fim = $data['data_fim'] ?? null;
        $this->horario_inicio = $data['horario_inicio'] ?? null;
        $this->horario_fim = $data['horario_fim'] ?? null;
        $this->id_tag = $data['id_tag'] ?? null;
    }

    public function isValid(): bool {
        return $this->titulo && $this->descricao && $this->data_inicio && $this->data_fim && $this->horario_inicio && $this->horario_fim && $this->id_tag;
    }
}