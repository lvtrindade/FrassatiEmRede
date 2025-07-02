<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\LoginService;
use App\DTOs\UsuarioDTO;
use App\Utils\ResponseFormatter;

class AuthController {
    private $service;

    public function __construct() {
        $this->service = new LoginService();
    }

    public function handle(Request $request, Response $response, $args): Response {
        $method = $request->getMethod();
        $id = $args['id'] ?? null;

        try {
            if ($method === 'POST') {
                $input = json_decode($request->getBody()->getContents(), true);
                $dto = new UsuarioDTO($input);
                $login = $this->service->autenticar($dto);
                $payload = ResponseFormatter::sucess("Login realizado", $login, 200);
            } else {
                $payload = ResponseFormatter::error("Método não suportado", 405);
            }
        } catch (Exception $e) {
            $payload = ResponseFormatter::error($e->getMessage(), 400);
        }

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}