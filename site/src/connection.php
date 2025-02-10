<?php
    $DBhost = "localhost";
    $DBusername = "root";
    $DBpassword = "";
    $DBname = "frassati_db";

    $connection = new mysqli($DBhost, $DBusername, $DBpassword, $DBname);
    $connection->set_charset("utf8");

    // if ($connection->connect_errno){
    //     echo "FALHA NA CONEXAO COM O BANCO DE DADOS";
    // } else {
    //     echo "BANCO CONECTADO";
    // }