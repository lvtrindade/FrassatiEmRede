<?php
namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as SlimResponse;

class JWTMiddleware implements MiddlewareInterface {
    public function process(Request $request, RequestHandler $handler): Response {
        if ($request->getMethod() === 'OPTIONS') {
            return $handler->handle($request);
        }

        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->unauthorized('Token ausente ou mal formatado');
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            $method = $request->getMethod();
            $requiresAdmin = in_array($method, ['POST', 'PUT', 'DELETE']);

            if ($requiresAdmin && ($decoded->role ?? '') !== 'ADMIN') {
                return $this->unauthorized('Permissão negada');
            }

            $request = $request->withAttribute('user', $decoded);

            return $handler->handle($request);
        } catch (\Exception $e) {
            return $this->unauthorized('Token inválido: ' . $e->getMessage());
        }
    }

    private function unauthorized(string $mensagem): Response {
        $response = new SlimResponse();
        $response->getBody()->write(json_encode([
          'cod' => 401,
            'mensagem' => $mensagem
        ]));

        return $response->withHeader('Content-Type', 'application/json')
                        ->withStatus(401);
    }
}

