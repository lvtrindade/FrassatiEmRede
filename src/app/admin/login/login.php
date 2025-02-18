<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método não permitido
    echo json_encode(["message" => "Método não permitido!", "erro" => true]);
    exit();
}

// Captura os dados do JSON recebido
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados foram enviados corretamente
if (!$data || !isset($data['username']) || !isset($data['password'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Dados não enviados corretamente!", "erro" => true]);
    exit();
}

$username = $data['username'];
$password = $data['password'];
// Exemplo de verificação simples (substitua com sua lógica de autenticação real)
$validUsername = "admin"; // Aqui você poderia fazer uma consulta ao banco de dados
$validPassword = "senha"; // Nunca faça isso em produção! Use hash de senha

// Verifica se o usuário e a senha são válidos
if ($username === $validUsername && $password === $validPassword) {
    echo json_encode([
        "message" => "Login bem-sucedido!",
        "usuario_recebido" => $username
    ]);
} else {
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Usuário ou senha inválidos!", "erro" => true]);
}
exit();