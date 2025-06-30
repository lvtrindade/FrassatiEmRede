<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido!", "erro" => true]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["message" => "Dados não enviados corretamente!", "erro" => true]);
    exit();
}

$username = $data['username'];
$password = $data['password'];

$validUsername = "admin";
$validPassword = "senha";

if ($username === $validUsername && $password === $validPassword) {

    session_start();

    $tempo_expiracao = time() + 3600 * 12;
    
    $_SESSION['authenticated'] = true;
    $_SESSION['expira'] = $tempo_expiracao;

    echo json_encode([
        "message" => "Login bem-sucedido!",
        "usuario_recebido" => $username
    ]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Usuário ou senha inválidos!", "erro" => true]);
}
exit();