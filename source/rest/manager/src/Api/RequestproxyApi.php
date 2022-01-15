<?php

namespace OpenAPIServer\Api;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RequestproxyApi extends AbstractRequestproxyApi {

  public function __construct(ContainerInterface $container) {
    parent::__construct($container);
  }

  public function getProxied(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    $url = $request->getQueryParam('url');
    $auth = $request->getQueryParam('authorization');
    $curl_session = curl_init();
    curl_setopt($curl_session, CURLOPT_HTTPHEADER, array(
        'Authorization: ' . $auth)
    );
    curl_setopt($curl_session ,CURLOPT_URL, $url);
    curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curl_session, CURLOPT_HEADER, TRUE);
    $result = curl_exec($curl_session);
    if (!curl_errno($curl_session)) {
      $header_size = curl_getinfo($curl_session, CURLINFO_HEADER_SIZE);
      $http_code = curl_getinfo($curl_session, CURLINFO_HTTP_CODE);
      $header = substr($result, 0, $header_size);
      $headers = $this->headersToArray($header);
      $contentType = null;
      if (array_key_exists('Content-Type', $headers)) {
        $contentType = $headers['Content-Type'];
      }
      $body = substr($result, $header_size);
      curl_close($curl_session);
      if ($contentType != null) {
        return $response->withStatus($http_code)->write($body)->withHeader('Content-Type', $contentType);
      } else {
        return $response->withStatus($http_code)->write($body);
      }
    } else {
      return $response->withStatus(500);
    }
  }

  private function headersToArray( $str ) {
    $headers = array();
    $headersTmpArray = explode( "\r\n" , $str );
    for ( $i = 0 ; $i < count( $headersTmpArray ) ; ++$i )
    {
      // we dont care about the two \r\n lines at the end of the headers
      if ( strlen( $headersTmpArray[$i] ) > 0 )
      {
        // the headers start with HTTP status codes, which do not contain a colon so we can filter them out too
        if ( strpos( $headersTmpArray[$i] , ":" ) )
        {
          $headerName = substr( $headersTmpArray[$i] , 0 , strpos( $headersTmpArray[$i] , ":" ) );
          $headerValue = substr( $headersTmpArray[$i] , strpos( $headersTmpArray[$i] , ":" )+1 );
          $headers[$headerName] = $headerValue;
        }
      }
    }
    return $headers;
  }
}
