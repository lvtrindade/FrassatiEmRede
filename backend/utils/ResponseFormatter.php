<?php
namespace App\Utils;

<<<<<<< HEAD
class ResponseFormatter {
    public static function success($mensagem, $data = null, $cod = 200) {
        http_response_code($cod);
        return json_encode([
            'cod' => $cod,
            'mensagem' => $mensagem,
            'data' => $data
        ]);
    }

    public static function error($mensagem, $cod = 400) {
        http_response_code($cod);
        return json_encode([
            'cod' => $cod,
            'mensagem' => $mensagem
        ]);
    }
}
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
