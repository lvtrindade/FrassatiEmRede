<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Middleware\MethodOverrideMiddleware;
use App\Middleware\CorsMiddleware;

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$app->add(new CorsMiddleware());

require __DIR__ . '/routes.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app->add(MethodOverrideMiddleware::class);

$app->run();
