<?php
    require '../connection.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $titulo = $data['titulo'];
    $descricao = $data['descricao'];
    $data_atividade = $data['data_atividade'];

    $sql = "INSER INTO Atividade (titulo, descricao, data_atividade) VALUES (:titulo, :descricao, :data_atividade)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':data_atividade', $data_atividade);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'sucess', 'message' => 'Atividade adicionada com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar atividade!']);
    }