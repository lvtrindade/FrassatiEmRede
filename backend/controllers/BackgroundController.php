<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\BackgroundService;
use App\DTOs\BackgroundDTO;
use App\Utils\ResponseFormatter;

class BackgroundController {
    private $service;

    public function __construct() {
        $this->service = new BackgroundService();
    }

    public function upload(Request $request, Response $response): Response {
        $body = $request->getParsedBody();
        $base64 = $body['imagem64'] ?? null;

        if (!$base64) {
            $response->getBody()->write(json_encode(["erro" => "Imagem não enviada"]));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        try {
            $imagem = $this->service->salvarImagemBase64($base64);
            $response->getBody()->write(json_encode(["mensagem" => "Imagem salva com sucesso", "data" => $imagem]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["erro" => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    public function obter(Request $request, Response $response): Response {
        $imagem = $this->service->obterImagemDeFundo();
        $response->getBody()->write(json_encode($imagem));
        return $response->withHeader('Content-Type', 'application/json');
    }
}