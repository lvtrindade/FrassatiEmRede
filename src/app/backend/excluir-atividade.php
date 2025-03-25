<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, GET, POST, OPTIONS"); // Permite os métodos DELETE, GET, POST e OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Responde à requisição de pré-voo (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../connection.php';

try {
    if (!$conn) {
        throw new Exception('Não foi possível conectar ao banco de dados.');
    }

    $id = $_GET['id'] ?? null;

    if (!$id) {
        throw new Exception('ID da atividade não fornecido.');
    }

    // Excluir a atividade
    $sql = "DELETE FROM Atividade WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => 'Atividade excluída com sucesso.']);
    } else {
        echo json_encode(['error' => 'Nenhuma atividade encontrada com o ID fornecido.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao excluir a atividade: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>