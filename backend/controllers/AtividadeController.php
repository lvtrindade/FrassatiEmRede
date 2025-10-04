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

                    if (isset($uploadedFiles['imagens_galeria']) && is_array($uploadedFiles['imagens_galeria'])) {
                        foreach ($uploadedFiles['imagens_galeria'] as $file) {
                            if ($file->getError() === UPLOAD_ERR_OK) {
                                $base64 = base64_encode($file->getStream()->getContents());
                                $this->service->adicionarImagemGaleria($nova['id'], $base64);
                            }
                        }
                    }

                    $nova = $this->service->buscarPorId($nova['id']);

                    return ResponseFormatter::success($response, "Criada", $nova, 201);

                case 'PUT':
                    $parsedBody = $request->getParsedBody();
                    $uploadedFiles = $request->getUploadedFiles();

                    if (isset($parsedBody['imagens_para_remover']) || isset($parsedBody['imagens_removidas'])) {
                        $json = $parsedBody['imagens_para_remover'] ?? $parsedBody['imagens_removidas'];
                        $idsParaRemover = json_decode($json, true);
                        foreach ($idsParaRemover as $idImagem) {
                            $this->service->removerImagemGaleria($idImagem);
                        }
                    }

                    if (isset($uploadedFiles['imagem_principal'])) {
                        $imagemPrincipal = $uploadedFiles['imagem_principal'];
                        if ($imagemPrincipal->getError() === UPLOAD_ERR_OK) {
                            $parsedBody['imagem_principal'] = base64_encode($imagemPrincipal->getStream()->getContents());
                        }
                    }

                    if (isset($uploadedFiles['imagens_galeria']) && is_array($uploadedFiles['imagens_galeria'])) {
                        foreach ($uploadedFiles['imagens_galeria'] as $file) {
                            if ($file->getError() === UPLOAD_ERR_OK) {
                                $base64 = base64_encode($file->getStream()->getContents());
                                $this->service->adicionarImagemGaleria($id, $base64);
                            }
                        }
                    }

                    $dto = new AtividadeDTO($parsedBody);

                    if (!$dto->isValid('editar')) {
                        return ResponseFormatter::error($response, "Dados inválidos (editar)", 400);
                    }

                    $atualizada = $this->service->editar($id, $dto);

                    $atualizada = $this->service->buscarPorId($id);

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
