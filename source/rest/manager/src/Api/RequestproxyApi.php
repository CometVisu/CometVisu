<?php

namespace OpenAPIServer\Api;

use OpenAPIServer\Helper;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RequestproxyApi extends AbstractRequestproxyApi {

  public function __construct(ContainerInterface $container) {
    parent::__construct($container);
  }

  public function getProxied(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
  {
    include(dirname(__DIR__).'/../../../resource/config/hidden.php');

    $url = Helper::getQueryParam($request, 'url');
    $auth = Helper::getQueryParam($request, 'auth-type');
    $hiddenConfigSection = Helper::getQueryParam($request, 'config-section');
    $selfSigned = Helper::getQueryParam($request, 'self-signed', 'false') === "true";
    $allowed = false;
    $configSection = [];
    if (is_null($hidden)) {
      $hidden = [];
    }
    if ($hiddenConfigSection != null) {
      if (array_key_exists($hiddenConfigSection, $hidden)) {
        $configSection = $hidden[$hiddenConfigSection];
        $url = $configSection['uri'];
        $selfSigned = array_key_exists( 'selfsigned', $configSection) && $configSection['selfsigned'] === 'true';
        $allowed = true;
      } else {
        return $response->withStatus(404);
      }
    } elseif (array_key_exists("proxy.whitelist", $hidden)) {
      // check hidden config if proxying this url is allowed
      $whiteList = $hidden["proxy.whitelist"];
      foreach ($whiteList as $name=>$value) {
        if (substr($value, 0, 1) === "/" && substr($value, -1) === "/" ) {
          if (preg_match($value, $url)) {
            $allowed = true;
            break;
          }
        } else if ($value == $url) {
          $allowed = true;
          break;
        }
      }
    }
    if (!$allowed) {
      return $response->withStatus(403);
    }
    $curl_session = curl_init();
    if ($auth != null) {
      switch ($auth) {
        case "basic":
          curl_setopt($curl_session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
          curl_setopt($curl_session, CURLOPT_USERPWD, $configSection["user"] . ":" . $configSection["pass"]);
          break;

        case "bearer":
          curl_setopt($curl_session, CURLOPT_HTTPAUTH, CURLAUTH_BEARER);
          curl_setopt($curl_session, CURLOPT_XOAUTH2_BEARER, $configSection["token"]);
          break;
      }

    }
    curl_setopt($curl_session,CURLOPT_URL, $url);
    curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curl_session, CURLOPT_HEADER, TRUE);
    if ($selfSigned) {
      curl_setopt($curl_session, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($curl_session, CURLOPT_SSL_VERIFYHOST, false);
    }
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
      $response->getBody()->write($body);
      if ($contentType != null) {
        return $response->withStatus($http_code)->withHeader('Content-Type', $contentType);
      } else {
        return $response->withStatus($http_code);
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
