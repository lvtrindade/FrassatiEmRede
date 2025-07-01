<?php
namespace App\DTOs;

class AtividadeDTO {
    public $titulo;
    public $descricao;
    public $imagem_principal;
    public $data_atividade;
    public $id_tag;
    public $data;

    public function __construct($data) {
        $this->$titulo = $data['titulo'] ?? null;
        $this->$descricao = $data['descricao'] ?? null;
        $this->$imagem_principal = $data['imagem_principal'] ?? null;
        $this->$data_atividade = $data['data_atividade'] ?? null;
        $this->$id_tag = $data['ramo'] ?? null;
    }

    public function isVAlid() {
        return $this->titulo && $this->descricao && $this->imagem_principal && $this->data_atividade && $this->id_tag;
    }
}