<?php
namespace App\Controllers;

use App\Services\EmailService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Utils\ResponseFormatter;

class EmailController {
    private $service;

    public function __construct() {
        $this->service = new EmailService();
    }

    public function enviar(Request $request, Response $response): Response {
        $dados = json_decode($request->getBody()->getContents(), true);

        try {
            $this->service->enviarEmail($dados);
            return ResponseFormatter::success($response, "E-mail enviado com sucesso.");
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, "Erro ao enviar e-mail: " . $e->getMessage(), 500);
        }
    }
}