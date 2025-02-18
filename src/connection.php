<?php
$host = 'localhost'; // ou o endereço do seu servidor de banco de dados
$dbname = 'frassati_db';
$username = 'usuario';
$password = 'senha';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
}