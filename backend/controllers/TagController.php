<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Services\TagService;
use App\Utils\ResponseFormatter;

class TagController {
    private $service;

    public function __construct() {
        $this->service = new TagService();
    }

    public function listar(Request $request, Response $response): Response {
        try {
            $tags = $this->service->listarTodas();
            $response->getBody()->write(ResponseFormatter::success("Tags recuperadas", $tags));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\Exception $e) {
            $response->getBody()->write(ResponseFormatter::error($e->getMessage(), 500));
            return $response->withStatus(500)->withHeader('Conten-Type', 'application/json');
        }
    }
}