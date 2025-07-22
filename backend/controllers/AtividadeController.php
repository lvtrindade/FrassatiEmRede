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
<<<<<<< HEAD

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
=======
        $parsedBody = $request->getParsedBody();

        if ($parsedBody === null) {
            $body = (string) $request->getBody();
            $parsedBody = json_decode($body, true) ?? [];
        }

        // Suporte para _method=PUT via POST
        if ($method === 'POST' && isset($parsedBody['_method']) && strtoupper($parsedBody['_method']) === 'PUT') {
            $method = 'PUT';
        }

        try {
            switch ($method) {
                case 'GET':
                    $data = $id ? $this->service->buscarPorId($id) : $this->service->listarTodas();
                    return ResponseFormatter::success($response, "Sucesso", $data);

                case 'POST':
                    $uploadedFiles = $request->getUploadedFiles();

                    if (isset($uploadedFiles['imagem_principal'])) {
                        $imagem = $uploadedFiles['imagem_principal'];
                        $parsedBody['imagem_principal'] = base64_encode($imagem->getStream()->getContents());
                    }

                    $dto = new AtividadeDTO($parsedBody);

                    if (!$dto->isValid('criar')) {
                        return ResponseFormatter::error($response, "Dados inválidos (criar)", 400);
                    }

                    $nova = $this->service->criar($dto);
                    return ResponseFormatter::success($response, "Criada", $nova, 201);

                case 'PUT':
                    $parsedBody = $request->getParsedBody();

                    if ($parsedBody === null) {
                        $body = (string) $request->getBody();
                        $parsedBody = json_decode($body, true) ?? $_POST ?? [];
                    }

                    $uploadedFiles = $request->getUploadedFiles();

                    if (isset($uploadedFiles['imagem_principal'])) {
                        $imagem = $uploadedFiles['imagem_principal'];
                        $parsedBody['imagem_principal'] = base64_encode($imagem->getStream()->getContents());
                    }

                    error_log("PUT (via POST): " . json_encode($parsedBody));

                    $dto = new AtividadeDTO($parsedBody);

                    if (!$dto->isValid('editar')) {
                        return ResponseFormatter::error($response, "Dados inválidos (editar)", 400);
                    }

                    $atualizada = $this->service->editar($id, $dto);
                    return ResponseFormatter::success($response, "Atividade atualizada", $atualizada);

                case 'DELETE':
                    $this->service->excluir($id);
                    return ResponseFormatter::success($response, "Atividade excluída");

                default:
                    return ResponseFormatter::error($response, "Método não suportado", 405);
            }
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, $e->getMessage(), 400);
        }
    }
}
>>>>>>> 1d831a65 (Recuperando projeto após corrupção do Git)
