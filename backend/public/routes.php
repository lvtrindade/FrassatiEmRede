<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Services\AtividadeService;

$app->get('/atividades', function (Request $request, Response $response) {
    try {
        $service = new AtividadeService();
        $atividades = $service->listarTodas();

        $response->getBody()->write(json_encode([
            "cod" => 200,
            "mensagem" => "Atividades recuperadas com sucesso",
            "data" => $atividades
        ]));
    } catch (Exception $e) {
        $response->getBody()->write(json_encode([
            "cod" => 500,
            "mensagem" => "Erro ao buscar atividades: " . $e->getMessage()
        ]));
    }

    return $response->withHeader('Content-Type', 'application/json');
});
