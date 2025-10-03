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
            return ResponseFormatter::success($response, "Tags recuperadas", $tags);
        } catch (\Exception $e) {
            return ResponseFormatter::error($response, $e->getMessage(), 500);
        }
    }
}