<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../../connection.php'; // Inclui o arquivo de conexão

try {

    if (!$conn) {
        throw new Exception('Não foi possível conectar ao banco de dados.');
    }

    $stmt = $conn->query("SELECT imagem FROM background ORDER BY id DESC LIMIT 1");
    $image = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($image && !empty($image['imagem'])) {
        echo json_encode(['imagem' => $image['imagem']]);
    } else {
        
        echo json_encode(['error' => 'Nenhuma imagem encontrada.']);
    }
} catch (PDOException $e) {
    
    echo json_encode(['error' => 'Erro ao consultar o banco de dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    
    echo json_encode(['error' => $e->getMessage()]);
}
?>