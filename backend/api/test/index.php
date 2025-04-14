<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . 'vendor/autoload.php';

$app = AppFactory::create();

$app->get('/api/test', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode(["sucess" => true]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();