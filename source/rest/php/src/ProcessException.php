<?php


namespace OpenAPIServer;


class ProcessException extends Exception
{
  protected $status = 500;
  protected $message;

  public function __construct($message, $status)
  {
    $this->message = $message;
    $this->status = $status;
  }

  public function getStatus() {
    return $this->status;
  }

  public function getMessage() {
    return $this->message;
  }
}