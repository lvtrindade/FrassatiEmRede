<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Métodos permitidos
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Cabeçalhos permitidos

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require '../../connection.php';

$data = json_decode(file_get_contents('php://input'), true);

// Valida os dados recebidos
if (
    empty($data['titulo']) ||
    empty($data['dataAtividade']) ||
    empty($data['descricao']) ||
    empty($data['imagemPrincipal']) ||
    empty($data['tag']) // Valida a tag selecionada
) {
    http_response_code(400); // Bad Request
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

// Extrai os dados
$titulo = $data['titulo'];
$dataAtividade = $data['dataAtividade'];
$descricao = $data['descricao'];
$imagemPrincipal = $data['imagemPrincipal'];
$imagensGaleria = $data['imagensGaleria'] ?? []; // Galeria é opcional
$idTag = $data['tag']; // ID da tag selecionada

try {
    // Insere a atividade na tabela Atividade
    $stmt = $conn->prepare('
        INSERT INTO Atividade (titulo, descricao, caminho_imagem_destaque, data_atividade)
        VALUES (?, ?, ?, ?)
    ');
    $stmt->execute([$titulo, $descricao, $imagemPrincipal, $dataAtividade]);

    // Recupera o ID da atividade recém-criada
    $idAtividade = $conn->lastInsertId();

    // Insere as imagens da galeria na tabela Galeria
    if (!empty($imagensGaleria)) {
        $stmt = $conn->prepare('
            INSERT INTO Galeria (id_atividade, imagem)
            VALUES (?, ?)
        ');
        foreach ($imagensGaleria as $imagem) {
            $stmt->execute([$idAtividade, $imagem]);
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
} catch (PDOException $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['erro' => 'Erro no servidor: ' . $e->getMessage()]);
}
?>