<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Controllers\AtividadeController;
use App\Controllers\CalendarioController;
use App\Controllers\BackgroundController;   

$app->map(['GET', 'POST', 'PUT', 'DELETE'], '/atividades[/{id}]', function (Request $request, Response $response, $args) {
    $controller = new AtividadeController();
    return $controller->handle($request, $response, $args);
});

$app->map(['GET', 'POST', 'PUT', 'DELETE'], '/evento[/{id}]', function (Request $request, Response $response, $args) {
    $controller = new CalendarioController();
    return $controller->handle($request, $response, $args);
});

$app->map(['GET', 'PUT'], '/background[/{id}]', function (Request $request, Response $response, $args) {
    $controller = new BackgroundController();
    return $controller->handle($request, $response, $args);
});