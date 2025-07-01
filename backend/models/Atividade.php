<?php
namespace App\Models;

class Atividade {
    public $id;
    public $titulo;
    public $descricao;
    public $imagem_principal;
    public $data;
    public $id_tag;
    public $tag;
    public $cor_tag;
    
    public function __construct($row) {
        $this->id = $row['id'] ?? null;
        $this->titulo = $row['titulo'] ?? null;
        $this->descricao = $row['descricao'] ?? null;
        $this->imagem_principal = $row['imagem_principal'] ?? null;
        $this->data = $row['data'] ?? null;
        $this->id_tag = $row['id_tag'] ?? null;
        $this->tag = $row['tag'] ?? null;
        $this->cor_tag = $row['cor_tag'] ?? null;
    }
}