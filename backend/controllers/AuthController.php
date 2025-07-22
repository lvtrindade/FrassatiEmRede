<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\AuthService;
<<<<<<< HEAD
=======
use App\Services\TokenService;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
use App\DTOs\UsuarioDTO;
use App\Utils\ResponseFormatter;

class AuthController {
    private $service;

    public function __construct() {
        $this->service = new AuthService();
    }

    public function login(Request $request, Response $response): Response {
        try {
            $input = json_decode($request->getBody()->getContents(), true);
            $dto = new UsuarioDTO($input);
            $login = $this->service->autenticar($dto);
<<<<<<< HEAD
            $payload = ResponseFormatter::success("Login realizado", $login, 200);
        } catch (\Exception $e) {
            $payload = ResponseFormatter::error($e->getMessage(), 400);
        }

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
=======

            $token = TokenService::gerarToken($login);

            unset($login['senha']);

            return ResponseFormatter::success($response, "Login realizado", [
                'usuario' => $login,
                'token' => $token
            ], 200);
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, $e->getMessage(), 400);
        }   
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    }
}