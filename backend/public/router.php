<?php
require_once '../controllers/AtividadeController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if (preg_match('/^\/atividades/?(\d+)?$/', $uri, $matches)) {
    $id = $matches[1] ?? null;
    $controller = new AtividadeController();
    $controller->handle($method, $id);
    exit;
}



echo json_encode(['mensagem' => 'Rota não encontrada']);