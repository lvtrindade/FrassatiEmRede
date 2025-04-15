<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode([
        'message' => 'Bem vindo à API Frassati em Rede',
        'routes' => [
            '/api/test' => 'Rota de Teste'
        ]
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/api/test', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode([
        'success' => true,
        'message' => 'API funcionando!'
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();