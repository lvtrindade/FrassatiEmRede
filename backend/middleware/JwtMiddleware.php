<?php
namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class JWTMiddleware {
    public function __invoke(Request $request, Response $response, $next) {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->unauthorized($response, 'Token ausente ou mal formatado');
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $method = $request->getMethod();
            $requiresAdmin = in_array($method, ['POST', 'PUT', 'DELETE']);

            if ($requiresAdmin && ($decoded->role ?? '') !== 'ADMIN') {
                return $this->unauthorized($response, 'Permissão negada');
            }

            $request = $request->withAttribute('user', $decoded);

            return $next($request, $response);
        } catch (\Exception $e) {
            return $this->unauthorized($response, 'Token inválido: ' . $e->getMessage());
        }
    }

    private function unauthorized(Response $response, string $message): Response {
        $response->getBody()->write(json_encode([
            'mensagem' => $message
        ]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }
}
