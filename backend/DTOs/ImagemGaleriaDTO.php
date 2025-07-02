<?php
namespace App\DTOs;

class ImagemGaleriaDTO {
    public $id_galeria;
    public $imagem_base64;

    public function __construct($data) {
        $this->id_galeria = $data['id_galeria'] ?? null;
        $this->imagem_base64 = $data['imagem_base64'] ?? null;
    }

    public function isValid() {
        return $this->id_galeria && $this->imagem_base64;
    }
}