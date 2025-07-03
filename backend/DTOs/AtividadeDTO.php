<?php
namespace App\DTOs;

class AtividadeDTO {
    public $titulo;
    public $descricao;
    public $imagem_principal;
    public $data_atividade;
    public $id_tag;

    public function __construct($data) {
        $this->titulo = $data['titulo'] ?? null;
        $this->descricao = $data['descricao'] ?? null;
        $this->data_atividade = $data['data_atividade'] ?? null;
        $this->id_tag = $data['id_tag'] ?? $data['tag_id'] ?? null;
        $this->imagem_principal = $data['imagem_principal'] ?? null;
    }

    public function isValid($modo = 'criar') {
        $erros = [];

        if (!$this->titulo) $erros[] = "titulo";
        if (!$this->descricao) $erros[] = "descricao";
        if (!$this->data_atividade) $erros[] = "data_atividade";
        if (!$this->id_tag) $erros[] = "id_tag";
        if ($modo === 'criar' && !$this->imagem_principal) $erros[] = "imagem_principal";

        if (!empty($erros)) {
            error_log("Campos inválidos: " . implode(', ', $erros));
        }

        return $modo === 'criar'
            ? $this->titulo && $this->descricao && $this->data_atividade && $this->id_tag && $this->imagem_principal
            : $this->titulo && $this->descricao && $this->data_atividade && $this->id_tag;
    }
}
