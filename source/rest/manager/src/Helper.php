<?php
namespace OpenAPIServer;

use Psr\Http\Message\ResponseInterface;

class Helper
{
    static function withJson(ResponseInterface $response, $data, $status = 200)
    {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader("Content-Type", "application/json")
            ->withStatus($status);
    }
}
