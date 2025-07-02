<?php
namespace App\DTOs;

class UsuarioDTO{
    public $usuario;
    public $senha;

    public function __construct ($data) {
        $this->usuario = $data['usuario'] ?? null;
        $this->senha = $data['senha'] ?? null;
    }

    public function isValid() {
        return !empty($this->usuario) && !empty($this->senha);
    }
}