<?php
    require '../connection.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $nome = $data['nome'];
    $data_atividade = $data['data_atividade'];
    $horario = $data['horario'];

    $sql = "INSERT INTO AtividadeCalendario (nome, data_atividade, horario) VALUES (:nome, :data_atividade, :horario)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':data_atividade', $data_atividade);
    $stmt->bindParam(':horario', $horario);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'sucess', 'message' => 'Atividade adicionada com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar atividade!']);
    }
