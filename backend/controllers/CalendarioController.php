<?php

namespace App\Controllers;

use App\Services\CalendarioService;
use App\DTOs\EventoDTO;
use App\Utils\ResponseFormatter;

class CalendarioController {
    private $service;

    public function __construct() {
        $this->service = new CalendarioService();
    }

    public function handle($method, $id=null) {
        try {
            switch ($method) {
                case 'GET':
                    if ($id) {
                        $data = $this->service->buscarPorId($id);
                        echo ResponseFormatter::sucess("Evento encontrado", $data);
                    } else {
                        $data = $this->service->listarTodas();
                        echo ResponseFormatter::sucess("Lista de eventos", $data);
                    }
                    break;

                case 'POST':
                    $input = $json_decode(file_get_contents('php://input'), true);
                    $dto = new EventoDTO($input);
                    $nova = $this->service->criar($dto);
                    echo ResponseFormatter::sucess("Evento criado", $nova, 201);
                    break;
                
                case 'PUT':
                    $input = json_decode(file_get_contents('php://input'), true);
                    $dto = new EventoDTO($input);
                    $atualizada = $this->service->editar($id, $dto);
                    echo ResponseFormatter::success("Evento atualizado", $atualizada);
                    break;
                
                case 'DELETE':
                    $this->service->excluir($id);
                    echo ResponseFormatter::sucess("Evento excluído");
                    break;

                default:
                    echo ResponseFormatter::error("Método não suportado", 405);
            }
        } catch (Exception $e) {
            echo ResponseFormatter::error($e->getMessage(), 400);
        }
    }
}