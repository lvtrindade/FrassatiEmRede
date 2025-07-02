<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\AtividadeService;
use App\DTOs\AtividadeDTO;
use App\Utils\ResponseFormatter;

class AtividadeController {
    private $service;
    
    public function __construct() {
        $this->service = new AtividadeService();
    }

    public function handle(Request $request, Response $response, $args): Response {
        $method = $request->getMethod();
        $id = $args['id'] ?? null;

        try {
            switch ($method) {    
                case 'GET':
                    $data = $id ? $this->service->buscarPorId($id) : $this->service->listarTodas();
                    $payload = ResponseFormatter::success("Sucesso", $data);
                    break;
                    
                case 'POST':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new AtividadeDTO($input);
                    $nova = $this->service->criar($dto);
                    $payload = ResponseFormatter::success("Criada", $nova, 201);
                    break;
                        
                case 'PUT':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new AtividadeDTO($input);
                    $atualizada = $this->service->editar($id, $dto);
                    $payload = ResponseFormatter::success("Atividade atualizada", $atualizada);
                    break;
                            
                case 'DELETE':
                    $this->service->excluir($id);
                    $payload = ResponseFormatter::success("Atividade excluída");
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