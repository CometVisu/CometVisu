<?php
namespace OpenAPIServer;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Helper
{
    static function withJson(ResponseInterface $response, $data, $status = 200)
    {
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader("Content-Type", "application/json")
            ->withStatus($status);
    }

    static function getQueryParam(ServerRequestInterface $request, $id) {
      $params = $request->getQueryParams();
      return array_key_exists($id, $params) ? $params[$id] : null;
    }
}
