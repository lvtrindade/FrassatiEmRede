<?php
namespace App\Services;

use Exception;

use App\Repositories\LoginRepository;
use App\DTOs\UsuarioDTO;

class AuthService {
    private $repo;

    public function __construct() {
        $this->repo = new LoginRepository();
    }

    public function autenticar(UsuarioDTO $dto) {
        if(!$dto->isValid()) {
            throw new Exception("Dados de login inválidos.");
        }

        $usuarioData = $this->repo->buscarPorUsuario($dto->usuario);

        if (!$usuarioData) {
            throw new Exception("Usuário ou senha inválidos.");
        }

        if (!password_verify($dto->senha, $usuarioData['senha'])) {
            throw new Exception("Usuário ou senha inválidos.");
        }

        return $usuarioData;
    }
}