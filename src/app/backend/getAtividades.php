<?php
    require '../connection.php';

    $sql = "SELECT * FROM Atividade";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $atividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($atividades);