<?php
    require '../connection.php';

    $sql = "SELECT * FROM AtividadeCalendario";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $calendario = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($calendario);

