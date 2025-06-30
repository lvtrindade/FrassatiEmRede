<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../../connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['background'])) {
    $file = $_FILES['background'];

    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($file['tmp_name']);

    if (in_array($fileType, $allowedTypes)) {

        $imageData = file_get_contents($file['tmp_name']);
        if ($imageData === false) {
            echo json_encode(['error' => 'Erro ao ler o arquivo.']);
            exit;
        }

        $base64 = base64_encode($imageData);

        $stmt = $conn->prepare("INSERT INTO Background (imagem) VALUES (:imagem)");
        $stmt->bindParam(':imagem', $base64);

        if ($stmt->execute()) {
            echo json_encode(['success' => 'Upload realizado com sucesso!']);
        } else {
            echo json_encode(['error' => 'Erro ao inserir no banco de dados.']);
        }
    } else {
        echo json_encode(['error' => 'Tipo de arquivo não suportado. Use JPEG, PNG, GIF ou WebP.']);
    }
} else {
    echo json_encode(['error' => 'Requisição inválida.']);
}
?>