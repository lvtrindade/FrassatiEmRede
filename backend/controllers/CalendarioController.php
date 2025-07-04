<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\CalendarioService;
use App\DTOs\EventoDTO;
use App\Utils\ResponseFormatter;

class CalendarioController {
    private $service;

    public function __construct() {
        $this->service = new CalendarioService();
    }

    public function handle(Request $request, Response $response, $args): Response {
        $method = $request->getMethod();
        $id = $args['id'] ?? null;

        try {
            switch ($method) {
                case 'GET':
                    $data = $id ? $this->service->buscarPorId($id) : $this->service->listarTodos();
                    return ResponseFormatter::success($response, "Sucesso", $data);

                case 'POST':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $nova = $this->service->criar($dto);
                    return ResponseFormatter::success($response, "Criado", $nova, 201);

                case 'PUT':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $atualizado = $this->service->editar($id, $dto);
                    return ResponseFormatter::success($response, "Evento atualizado", $atualizado);

                case 'DELETE':
                    $this->service->excluir($id);
                    return ResponseFormatter::success($response, "Evento excluído");

                default:
                    return ResponseFormatter::error($response, "Método não suportado", 405);
            }
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, $e->getMessage(), 400);
        }
    }
}
