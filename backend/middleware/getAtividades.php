<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../../connection.php';

// Define o fuso horário
date_default_timezone_set('America/Sao_Paulo');

try {
    if (!$conn) {
        throw new Exception('Não foi possível conectar ao banco de dados.');
    }

    $sql = "
        SELECT 
            a.id, 
            a.titulo, 
            a.descricao, 
            a.caminho_imagem_destaque, 
            a.data_atividade, 
            t.nome AS tag_nome, 
            t.cor AS tag_cor
        FROM Atividade a
        LEFT JOIN AtividadeTag at ON a.id = at.id_atividade
        LEFT JOIN Tag t ON at.id_tag = t.id
        ORDER BY a.id DESC
    ";

    $stmt = $conn->query($sql);
    $atividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($atividades && !empty($atividades)) {
        echo json_encode(['atividades' => $atividades]);
    } else {
        echo json_encode(['error' => 'Nenhuma atividade encontrada.']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao consultar o banco de dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>