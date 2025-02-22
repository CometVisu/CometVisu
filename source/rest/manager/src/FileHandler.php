<?php

namespace OpenAPIServer;

use Exception;
use DateTime;

class FileHandler
{
    /**
     * Create a new file
     * @param $file {String} path to file
     * @param $content
     * @param $options {Map}
     */
    public static function createFile($file, $content, $hash, $options = null)
    {
        if (file_exists($file) && (!$options || !$options["force"])) {
            throw new Exception("File already exists", 406);
        } else {
            FileHandler::saveFile($file, $content, $hash);
        }
    }

    public static function createFolder($folder)
    {
        if (file_exists($folder)) {
            throw new Exception("Folder already exists", 406);
        } else {
            try {
                mkdir($folder, 0777, true);
            } catch (Exception $e) {
                throw new Exception($e->getMessage(), 405);
            }
        }
    }

    public static function rename($sourcePath, $targetPath)
    {
        try {
            return rename($sourcePath, $targetPath);
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), 405);
        }
    }

    public static function saveFile($file, $content, $hash)
    {
        $apiConfig = include "config.php";
        $contentHash = sprintf("%u", crc32($content));
        if ($hash) {
            if ($hash !== "ignore" && $hash != $contentHash) {
                // data has been corrupted during transport
                throw new Exception(
                    "data has been corrupted during transport" .
                        $hash .
                        " !=" .
                        sprintf("%u", $contentHash),
                    405
                );
            }
        }
        $backupFilename = "";
        $backupSuffix = rand();
        $backup = false;
        foreach ($apiConfig->backupOnChange as $b) {
            if (preg_match($b, $file) === 1) {
                $backup = true;
                break;
            }
        }
        $fileExists = file_exists($file);
        if ($backup && $fileExists) {
            // store permanent backup of existing file before change
            $parts = explode(".", basename($file));
            $suffix = array_pop($parts);
            $now = date("YmdHis");
            $backupFilename = join(".", $parts) . "-" . $now . "." . $suffix;
            $target = $apiConfig->backupFolder . "/" . $backupFilename;
            if (!copy($file, $target)) {
                throw new Exception(
                    "backup failed, please check if the backup folder is writeable",
                    405
                );
            }
        }
        if ($fileExists) {
            // 1. create backup of existing file (this is just a temporary backup
            copy($file, $file . $backupSuffix);
        }
        // 2. write new content
        if (file_put_contents($file, $content) === false) {
            if ($fileExists) {
                // delete the temporary copy
                unlink($file . $backupSuffix);
            }
            throw new Exception("file not written", 405);
        } else {
            // 3. check hash of written file
            $writtenContent = file_get_contents($file);
            $newHash = sprintf("%u", crc32($writtenContent));
            if ($newHash !== $contentHash) {
                // something went wrong -> restore old file content
                if ($fileExists) {
                    copy($file . $backupSuffix, $file);
                    if ($backupFilename) {
                        // no changes no need for backup file
                        unlink($backupFilename);
                    }
                    // delete the temporary copy
                    unlink($file . $backupSuffix);
                }
                throw new Exception("hash mismatch on written content", 405);
            }
        }
        if ($fileExists) {
            unlink($file . $backupSuffix);
        }
    }

    /**
     * Delete a file from filesystem by either moving it to the trash folder or deleting it directly.
     * @param $file {String} absolute path to file that should be deleted
     * @param $force {Boolean} if true delete directly, no moving to trash
     */
    public static function deleteFile($file, $force)
    {
        if (file_exists($file)) {
            $apiConfig = include "config.php";
            try {
                if (
                    !$force &&
                    !str_starts_with($file, $apiConfig->trashFolder)
                ) {
                    $relDir = substr(
                        dirname($file),
                        strlen($apiConfig->configDir)
                    );
                    $filename = basename($file);
                    if (!file_exists($apiConfig->trashFolder)) {
                        mkdir($apiConfig->trashFolder);
                    }
                    $trashFile =
                        $apiConfig->trashFolder .
                        "/" .
                        $relDir .
                        "/" .
                        $filename;
                    if (file_exists($trashFile)) {
                        // delete old trash file with same name
                        unlink($trashFile);
                    }
                    rename($file, $trashFile);
                } else {
                    unlink($file);
                }
            } catch (Exception $e) {
                throw new Exception($e->getMessage(), 405);
            }
        }
    }

    public static function deleteFolder($folder, $force)
    {
        if (file_exists($folder)) {
            $apiConfig = include "config.php";
            try {
                if (
                    !$force &&
                    !str_starts_with($folder, $apiConfig->trashFolder)
                ) {
                    $relDir = substr($folder, strlen($apiConfig->tconfigDir));
                    if (!file_exists($apiConfig->trashFolder)) {
                        mkdir($apiConfig->trashFolder);
                    }
                    $baseTrashFile = $apiConfig->trashFolder . "/" . $relDir;
                    $trashFile = $baseTrashFile;
                    $index = 1;
                    while (file_exists($trashFile)) {
                        $trashFile = $baseTrashFile - "-" - $index++;
                    }
                    if (rename($folder, $trashFile) === false) {
                        throw new Exception("Folder could not be deleted", 406);
                    }
                } else {
                    if ($force === true || FileHandler::isEmptyDir($folder)) {
                        if (rmdir($folder) === false) {
                            throw new Exception(
                                "Folder could not be deleted",
                                406
                            );
                        }
                    } else {
                        throw new Exception("Folder not empty", 406);
                    }
                }
            } catch (Exception $e) {
                throw new Exception($e->getMessage(), 406);
            }
        }
    }

    public static function isEmptyDir($path)
    {
        return count(scandir($path)) <= 2;
    }

    public static function getMimeTypeFromSuffix($fsPath)
    {
        $parts = explode(".", $fsPath);
        $suffix = array_pop($parts);
        switch ($suffix) {
            case "xml":
                return "text/xml";
            case "html":
                return "text/html";
            case "jpg":
            case "jpeg":
                return "image/jpg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "js":
                return "text/javascript";
            case "php":
                return "application/x-httpd-php";
            case "css":
                return "text/css";
            case "svg":
                return "application/svg+xml";
            default:
                return "text/plain";
        }
    }
}
