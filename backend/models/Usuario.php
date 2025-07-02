<?php
namespace App\Models;

class Usuario {
    public $id;
    public $usuario;
    public $senha;
    public $role;

    function __construct($data) {
        $this->id = $data['id'];
        $this->usuario = $data['usuario'];
        $this->senha = $data['senha'];
        $this->role = $data['role'];
    }
}