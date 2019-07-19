<?php

namespace OpenAPIServer;

use Exception;
use DateTime;

class FileHandler
{
  public static function saveFile($file, $content, $hash) {
    $apiConfig = include("config.php");
    if ($hash) {
      $contentHash = sprintf('%u', crc32($content));
      if ($hash != $contentHash) {
        // data has been corrupted during transport
        throw new Exception('data has been corrupted during transport' . $hash . ' !=' . sprintf('%u', $contentHash), 405);
      }
      $backupFilename = "";
      $backupSuffix = rand();
      $backup = false;
      forEach($apiConfig->backupOnChange as $b) {
        if (preg_match($b, $file) === 1) {
          $backup = true;
          break;
        }
      }
      $fileExists = file_exists($file);
      if ($backup && $fileExists) {
        // store permanent backup of existing file before change
        $parts = explode('.', basename($file));
        $suffix = array_pop($parts);
        $backupFilename = join('.', $parts) . '-' . preg_replace('/[\D]/g', '', explode('.', date(DateTime::ISO8601))[0])
          . '.' . $suffix;
        $target = $apiConfig->backupFolder . '/' . $backupFilename;
        copy($file, $target);
      }
      if ($fileExists) {
        // 1. create backup of existing file (this is just a temporary backup
        copy($file, $file . $backupSuffix);
      }
      // 2. write new content
      file_put_contents($file, $content);
      // 3. check hash of written file
      $writtenContent = file_get_contents($file);
      $newHash = sprintf('%u', crc32($writtenContent));
      if ($newHash !== $contentHash) {
        // something went wrong -> restore old file content
        if ($fileExists) {
          copy($file . $backupSuffix, $file);
          if ($backupFilename) {
            // no changes no need for backup file
            unlink($backupFilename);
          }
        }
        throw new Exception('hash mismatch on written content', 405);
      }
      if ($fileExists) {
        unlink($file . $backupSuffix);
      }
    } else {
      file_put_contents($file, $content);
    }
  }
}