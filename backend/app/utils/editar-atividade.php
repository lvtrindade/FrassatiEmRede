<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../connection.php';

try {
    if (!$conn) {
        throw new Exception('Não foi possível conectar ao banco de dados.');
    }

    // Verifica se é POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Método não permitido']);
        exit();
    }

    // Recebe os dados do FormData
    $id = $_POST['id'] ?? null;
    $titulo = $_POST['titulo'] ?? null;
    $descricao = $_POST['descricao'] ?? null;
    $dataAtividade = $_POST['dataAtividade'] ?? null;
    $tag_id = $_POST['tag_id'] ?? null;
    $imagensRemovidas = json_decode($_POST['imagensRemovidas'] ?? '[]', true);

    if (!$id || !$titulo || !$descricao || !$dataAtividade || !$tag_id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Dados obrigatórios faltando']);
        exit();
    }

    $conn->beginTransaction();

    try {
        // Atualiza atividade
        $stmt = $conn->prepare("UPDATE Atividade SET titulo=?, descricao=?, data_atividade=? WHERE id=?");
        $stmt->execute([$titulo, $descricao, $dataAtividade, $id]);

        // Atualiza tag
        $stmtTag = $conn->prepare("UPDATE AtividadeTag SET id_tag=? WHERE id_atividade=?");
        $stmtTag->execute([$tag_id, $id]);

        // Remove imagens da galeria se necessário
        if (!empty($imagensRemovidas)) {
            $placeholders = implode(',', array_fill(0, count($imagensRemovidas), '?'));
            $stmtRemove = $conn->prepare("DELETE FROM Galeria WHERE id IN ($placeholders)");
            $stmtRemove->execute($imagensRemovidas);
        }

        // Atualiza imagem principal se fornecida
        if (!empty($_FILES['imagemPrincipal']['tmp_name'])) {
            $imagemData = file_get_contents($_FILES['imagemPrincipal']['tmp_name']);
            $stmtImg = $conn->prepare("UPDATE Atividade SET caminho_imagem_destaque=? WHERE id=?");
            $stmtImg->execute([base64_encode($imagemData), $id]);
        }

        // Adiciona novas imagens à galeria
        if (!empty($_FILES['imagensGaleria']['tmp_name'][0])) {
            $stmtGaleria = $conn->prepare("INSERT INTO Galeria (id_atividade, imagem) VALUES (?, ?)");
            foreach ($_FILES['imagensGaleria']['tmp_name'] as $tmpName) {
                $imagemData = file_get_contents($tmpName);
                $stmtGaleria->execute([$id, base64_encode($imagemData)]);
            }
        }

        $conn->commit();

        // Resposta de sucesso padronizada
        $response = [
            'success' => true,
            'message' => 'Atividade atualizada com sucesso',
            'data' => [
                'id' => $id,
                'titulo' => $titulo
            ]
        ];
        
        echo json_encode($response);
        
    } catch (PDOException $e) {
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erro no banco de dados: ' . $e->getMessage()]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>