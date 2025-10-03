<?php
namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as Handler;
use Psr\Http\Server\MiddlewareInterface;
use Slim\Psr7\Response as SlimResponse;

class CorsMiddleware implements MiddlewareInterface {
    public function process(Request $request, Handler $handler): Response {
        $origin = $request->getHeaderLine('Origin');
        $allowedOrigins = [
            'http://localhost:4200',
            'http://127.0.0.1:4200',
            'http://localhost'
        ];

        $response = $request->getMethod() === 'OPTIONS'
            ? new SlimResponse(200)
            : $handler->handle($request);

        $headers = [
            'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age' => '86400',
        ];

        if (in_array($origin, $allowedOrigins)) {
            $headers['Access-Control-Allow-Origin'] = $origin;
        } else {
            $headers['Access-Control-Allow-Origin'] = '*';
        }

        foreach ($headers as $key => $value) {
            $response = $response->withHeader($key, $value);
        }

        return $response;
    }
}
