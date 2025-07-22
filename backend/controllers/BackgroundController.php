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
<<<<<<< HEAD
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
=======
        $uploadedFiles = $request->getUploadedFiles();

        if (!isset($uploadedFiles['background'])) {
            return ResponseFormatter::error($response, "Imagem não enviada", 400);
        }

        $file = $uploadedFiles['background'];

        if ($file->getError() !== UPLOAD_ERR_OK) {
            return ResponseFormatter::error($response, "Erro no upload da imagem", 400);
        }

        $base64 = base64_encode($file->getStream()->getContents());

        try {
            $imagem = $this->service->salvarImagemBase64($base64);
            return ResponseFormatter::success($response, "Imagem salva com sucesso", $imagem);
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, $e->getMessage(), 500);
        }
    }


    public function obter(Request $request, Response $response): Response {
    try {
        $imagem = $this->service->obterImagemDeFundo();

        if (!$imagem) {
            $response->getBody()->write(json_encode(["erro" => "Imagem não encontrada no banco de dados."]));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($imagem));
        return $response->withHeader('Content-Type', 'application/json');
        
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["erro" => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
<<<<<<< HEAD

    public function obter(Request $request, Response $response): Response {
        $imagem = $this->service->obterImagemDeFundo();
        $response->getBody()->write(json_encode($imagem));
        return $response->withHeader('Content-Type', 'application/json');
    }
=======
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
}