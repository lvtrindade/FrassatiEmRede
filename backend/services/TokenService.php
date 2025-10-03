<?php
namespace App\Services;

use Firebase\JWT\JWT;

class TokenService {
    public static function gerarToken($usuario) {
        $payload = [
            'sub' => $usuario['id'],
            'role' => $usuario['role'],
            'exp' => time() + (60 * 60 * 12)
        ];

        return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
    }
}
