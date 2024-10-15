<?php
// File for configurations that shouldn't be shared with the user
$data = '{
  "fritzbox": {
    "uri": "https://192.168.178.1:49443/", 
    "user": "cometvisu",
    "pass": "secret123",
    "selfsigned": "true"
  },
  "influx": {
    "uri": "http://jarvis:8086",
    "token": "0YdRi-TvRLZFBoWzYlNzHyqNB74icsY1FpS2S5lWPQ4nI5uyuUU231LqHah7wwp1jET29zFg3gPROexGE13g7w==",
    "config": "flux"
  },
  "proxy.whitelist": {
    "local": "/.*192.168.178.*/"
  }
}';

try {
  $hidden = json_decode($data, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
  $hidden = ["error" => $e->getMessage(), "data" => $data];
}
