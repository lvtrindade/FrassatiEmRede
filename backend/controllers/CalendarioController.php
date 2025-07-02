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
                    $payload = ResponseFormatter::success("Sucesso", $data);
                    break;

                case 'POST':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $nova = $this->service->criar($dto);
                    $payload = ResponseFormatter::success("Criado", $nova, 201);
                    break;
                
                case 'PUT':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $atualizado = $this->service->editar($id, $dto);
                    $payload = ResponseFormatter::success("Evento atualizado", $atualizado);
                    break;
                
                case 'DELETE':
                    $this->service->excluir($id);
                    $payload = ResponseFormatter::success("Evento excluído");
                    break;

                default:
                    $payload = ResponseFormatter::error("Método não suportado", 405);
            }
        } catch (Exception $e) {
            $payload = ResponseFormatter::error($e->getMessage(), 400);
        }

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}