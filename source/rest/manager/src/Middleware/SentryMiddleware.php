<?php

namespace OpenAPIServer\Middleware;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ResponseInterface as Response;
use Throwable;

class SentryMiddleware
{
  /**
   * Invoke middleware.
   *
   * @param Request $request The request
   * @param RequestHandler $handler The handler
   *
   * @throws Throwable
   *
   * @return Response The response
   */
  public function __invoke(
    Request $request,
    RequestHandler $handler
  ): Response {
    $useSentry = $request->hasHeader('HTTP_X_TRANSACTION_ID');
    if ($useSentry) {
      try {
        \Sentry\configureScope(function (\Sentry\State\Scope $scope): void {
          $scope->setTag('transaction_id', $_SERVER['HTTP_X_TRANSACTION_ID']);
        });
        return $handler->handle($request)->withHeader('X-Sentry-Enabled', 'true');

      } catch (Throwable $exception) {
        \Sentry\captureException($exception);

        throw $exception;
      }
    }
    return $handler->handle($request);
  }
}
