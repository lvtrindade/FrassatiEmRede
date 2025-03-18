<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../../connection.php';

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['erro' => 'Requisição inválida.']);
    exit;
}

// Verifica se os arquivos foram enviados
if (
    empty($_POST['titulo']) ||
    empty($_POST['dataAtividade']) ||
    empty($_POST['descricao']) ||
    empty($_FILES['imagemPrincipal']) ||
    empty($_POST['tag'])
) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

// Extrai os dados
$titulo = $_POST['titulo'];
$dataAtividade = $_POST['dataAtividade']; // Já está no formato YYYY-MM-DD
$descricao = $_POST['descricao'];
$idTag = $_POST['tag']; // ID da tag selecionada

try {
    // Valida a data (opcional)
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataAtividade)) {
        throw new Exception('Formato de data inválido. Use YYYY-MM-DD.');
    }

    // Processa a imagem principal
    $imagemPrincipal = $_FILES['imagemPrincipal'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($imagemPrincipal['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        throw new Exception('Tipo de arquivo não suportado para a imagem principal. Use JPEG, PNG, GIF ou WebP.');
    }

    $imagemPrincipalData = file_get_contents($imagemPrincipal['tmp_name']);
    if ($imagemPrincipalData === false) {
        throw new Exception('Erro ao ler a imagem principal.');
    }

    $imagemPrincipalBase64 = base64_encode($imagemPrincipalData);

    // Insere a atividade na tabela Atividade
    $stmt = $conn->prepare('
        INSERT INTO Atividade (titulo, descricao, caminho_imagem_destaque, data_atividade)
        VALUES (?, ?, ?, ?)
    ');
    $stmt->execute([$titulo, $descricao, $imagemPrincipalBase64, $dataAtividade]);

    // Recupera o ID da atividade recém-criada
    $idAtividade = $conn->lastInsertId();

    // Processa as imagens da galeria (se houver)
    if (!empty($_FILES['imagensGaleria'])) {
        $imagensGaleria = $_FILES['imagensGaleria'];
        $stmt = $conn->prepare('
            INSERT INTO Galeria (id_atividade, imagem)
            VALUES (?, ?)
        ');

        foreach ($imagensGaleria['tmp_name'] as $index => $tmpName) {
            $fileType = mime_content_type($tmpName);
            if (!in_array($fileType, $allowedTypes)) {
                throw new Exception('Tipo de arquivo não suportado para uma imagem da galeria. Use JPEG, PNG, GIF ou WebP.');
            }

            $imagemData = file_get_contents($tmpName);
            if ($imagemData === false) {
                throw new Exception('Erro ao ler uma imagem da galeria.');
            }

            $imagemBase64 = base64_encode($imagemData);
            $stmt->execute([$idAtividade, $imagemBase64]);
        }
    }

    // Insere a tag na tabela AtividadeTag
    $stmt = $conn->prepare('
        INSERT INTO AtividadeTag (id_atividade, id_tag)
        VALUES (?, ?)
    ');
    $stmt->execute([$idAtividade, $idTag]);

    // Retorna uma mensagem de sucesso
    echo json_encode(['mensagem' => 'Atividade criada com sucesso!']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>