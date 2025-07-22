<?php

use Slim\Routing\RouteCollectorProxy;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Controllers\AtividadeController;
use App\Controllers\CalendarioController;
use App\Controllers\BackgroundController;
<<<<<<< HEAD
=======
use App\Controllers\EmailController;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
use App\Controllers\AuthController;
use App\Controllers\TagController;
use App\Middleware\JwtMiddleware;

$app->post('/login', [AuthController::class, 'login']);

$app->get('/atividades[/{id}]', [AtividadeController::class, 'handle']);
$app->group('/atividades', function (RouteCollectorProxy $group) {
    $group->post('', [AtividadeController::class, 'handle']);
<<<<<<< HEAD
=======
    $group->post('/{id}', [AtividadeController::class, 'handle']);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    $group->put('/{id}', [AtividadeController::class, 'handle']);
    $group->delete('/{id}', [AtividadeController::class, 'handle']);
})->add(new JwtMiddleware());

$app->get('/evento[/{id}]', [CalendarioController::class, 'handle']);
$app->group('/evento', function (RouteCollectorProxy $group) {
    $group->post('', [CalendarioController::class, 'handle']);
<<<<<<< HEAD
=======
    $group->post('/{id}', [CalendarioController::class, 'handle']);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
    $group->put('/{id}', [CalendarioController::class, 'handle']);
    $group->delete('/{id}', [CalendarioController::class, 'handle']);
})->add(new JwtMiddleware());

$app->get('/background', [BackgroundController::class, 'obter']);
<<<<<<< HEAD
$app->put('/background', [BackgroundController::class, 'upload'])->add(new JwtMiddleware());

$app->get('/tags', [TagController::class, 'listar']);
=======
$app->post('/background', [BackgroundController::class, 'upload'])->add(new JwtMiddleware());

$app->get('/tags', [TagController::class, 'listar']);

$app->post('/email', [EmailController::class, 'enviar']);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
