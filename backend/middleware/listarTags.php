<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../../connection.php';

try {
    // Prepara e executa a consulta
    $stmt = $conn->query("SELECT * FROM Tag");
    $tags = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna as tags em formato JSON
    echo json_encode($tags);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Erro ao listar tags: " . $e->getMessage()));
}