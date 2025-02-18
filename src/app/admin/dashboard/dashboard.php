<?php
    session_start();

    if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true || !isset($_SESSION['expira']) || $_SESSION['expira'] < time()) {
        http_response_code(401);
        echo json_encode(["message" => "Sessão expirada ou não autorizada!", "erro" => true]);
        exit();
    }