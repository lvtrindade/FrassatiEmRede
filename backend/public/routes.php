<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Controllers\AtividadeController;
use App\Controllers\CalendarioController;

$app->map(['GET', 'POST', 'PUT', 'DELETE'], '/atividades[/{id}]', function (Request $request, Response $response, $args) {
    $controller = new AtividadeController();
    return $controller->handle($request, $response, $args);
});