<?php
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