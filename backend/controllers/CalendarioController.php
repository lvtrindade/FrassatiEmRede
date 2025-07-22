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
<<<<<<< HEAD
                    $payload = ResponseFormatter::success("Sucesso", $data);
                    break;
=======
                    return ResponseFormatter::success($response, "Sucesso", $data);
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)

                case 'POST':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $nova = $this->service->criar($dto);
<<<<<<< HEAD
                    $payload = ResponseFormatter::success("Criado", $nova, 201);
                    break;
                
=======
                    return ResponseFormatter::success($response, "Criado", $nova, 201);

>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
                case 'PUT':
                    $input = json_decode($request->getBody()->getContents(), true);
                    $dto = new EventoDTO($input);
                    $atualizado = $this->service->editar($id, $dto);
<<<<<<< HEAD
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
=======
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
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
