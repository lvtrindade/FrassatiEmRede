<?php
namespace App\Utils;

use Psr\Http\Message\ResponseInterface;

class ResponseFormatter {
    public static function success(ResponseInterface $response, $mensagem, $data = null, $cod = 200): ResponseInterface {
        $response->getBody()->write(json_encode([
            'cod' => $cod,
            'mensagem' => $mensagem,
            'data' => $data
        ]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($cod);
    }

    public static function error(ResponseInterface $response, $mensagem, $cod = 400): ResponseInterface {
        $response->getBody()->write(json_encode([
            'cod' => $cod,
            'mensagem' => $mensagem
        ]));

        return $response->withHeader('Content-Type', 'application/json')->withStatus($cod);
    }
}
