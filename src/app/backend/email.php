<?php
    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json; charset=UTF-8"); 
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $name = $data['name'];
        $email = $data['email'];
        $telephone = $data['telephone'];
        $section = $data['section'];
        $content = $data['content'];

        if (empty($name) || empty($email) || empty($telephone) || empty($section) || empty($content)) {
            echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios']);
            exit;
        }

        $to = 'lucasventurintrindade@gmail.com';
        $subject = $section;
        $message = "Nome: $name\n\nContato:\n\nEmail: $email\nTelefone: $telephone\n\n\n$content";
        $headers = 'From: no-reply@gmail.com' . "\r\n" . 'Reply-to: no-reply@gmail.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['status' => 'sucess', 'message' => 'E-mail enviado com successo!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar o e-mail.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);
    }