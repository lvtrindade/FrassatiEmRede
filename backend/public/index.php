<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
<<<<<<< HEAD
=======
use Slim\Middleware\MethodOverrideMiddleware;
use App\Middleware\CorsMiddleware;
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

<<<<<<< HEAD
=======
$app->add(new CorsMiddleware());

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
require __DIR__ . '/routes.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

<<<<<<< HEAD
=======
$app->add(MethodOverrideMiddleware::class);

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
$app->run();
