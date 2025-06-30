<?php
require_once 'services/AtividadeService.php';
require_once 'DTOs/AtividadeDTO.php';
require_once 'utils/ResponseFormatter.php';

class AtividadeController {
    private $service;
    
    public function __contruct() {
        $this->service = new AtividadeService();
    }

    public function handle($method, $id=null) {
        try {
            switch ($method) {    
                case 'GET':
                    if ($id) {
                        $data = $this->service->buscarPorId($id);
                        echo ResponseFormatter::sucess("Atividade encontrada", $data);
                    } else {
                        $data = $this->service->listarTodas();
                        echo ResponseFormatter::sucess("Lista de atividades", $data);
                    }
                    break;
                    
                case 'POST':
                    $input = $json_decode(file_get_contents('php://input'), true);
                    $dto = new AtividadeDTO($input);
                    $nova = $this->service->criar($dto);
                    echo ResponseFormatter::sucess("Atividade criada", $nova, 201);
                    break;
                        
                case 'PUT':
                    $input = json_decode(file_get_contents('php://input'), true);
                    $dto = new AtividadeDTO($input);
                    $atualizada = $this->service->editar($id, $dto);
                    echo ResponseFormatter::sucess("Atividade atualizada", $atualizada);
                    break;
                            
                case 'DELETE':
                    $this->service->excluir($id);
                    echo ResponseFormatter::sucess("Atividade excluída");
                    break;

                default:
                    echo ResponseFormatter::error("Método não suportado", 405);
            }

        } catch (Exception $e) {
            echo ResponseFormatter::error($e->getMessage(), 400);
        }
    }
}