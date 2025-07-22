<?php
namespace App\Services;

use App\Utils\EmailSender;
use Exception;

class EmailService {
    public function enviarEmail($dados) {
        if (
            empty($dados['name']) || empty($dados['email']) ||
            empty($dados['telephone']) || empty($dados['section']) ||
            empty($dados['content'])
        ) {
            throw new Exception("Todos os campos são obrigatórios.");
        }

        EmailSender::enviar(
            'lucasventurintrindade@gmail.com',
            'Novo contato pelo site',
            "
                <h2>Contato</h2>
                <p><strong>Nome:</strong> {$dados['name']}</p>
                <p><strong>Email:</strong> {$dados['email']}</p>
                <p><strong>Telefone:</strong> {$dados['telephone']}</p>
                <p><strong>Assunto:</strong> {$dados['section']}</p>
                <p><strong>Mensagem:</strong> {$dados['content']}</p>
            "
        );
    }
}