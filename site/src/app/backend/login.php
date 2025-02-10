<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json");

    $json = file_get_contents("php://input");
    $dados = json_decode($json, true);

    if (!empty($dados['usuario']) && !empty($dados['senha'])) {
        $usuario = $dados['usuario'];
        $senha = $dados['senha'];

        if ($usuario == "1" && $senha == "1") {
            echo json_encode(["sucesso" => true, "mensagem" => "Login realizado!"]);
            
        } else {
            echo json_encode(["sucesso" => false, "mensagem" => "Usuário ou senha inválidos."]);
        }
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos."]);
    }
