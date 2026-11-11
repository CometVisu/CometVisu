<?php
/*
 * Copyright (c) 2026, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

require __DIR__ . "/../vendor/autoload.php";

use OpenAPIServer\Api\FsApi;
use Slim\Psr7\Factory\ServerRequestFactory;
use Slim\Psr7\Factory\StreamFactory;
use Slim\Psr7\Response;
use Slim\Psr7\UploadedFile;

$base = sys_get_temp_dir() . "/cv-fs-test-" . bin2hex(random_bytes(8));
mkdir($base);
mkdir($base . "/readonly");
$files = [];

try {
    $reflection = new ReflectionClass(FsApi::class);
    $api = $reflection->newInstanceWithoutConstructor();
    $mount = ["mountPoint" => "readonly", "path" => $base . "/readonly", "writeable" => false];
    foreach ([
        "baseDir" => $base,
        "mounts" => ["readonly"],
        "config" => (object) ["trashFolderName" => ".trash", "configDir" => $base, "mounts" => [$mount]],
    ] as $name => $value) {
        $property = $reflection->getProperty($name);
        $property->setAccessible(true);
        $property->setValue($api, $value);
    }

    $streams = new StreamFactory();
    $factory = new ServerRequestFactory();
    $create = function ($path, $type, $content, $fields = [], $upload = true, $multipart = true, $hash = null) use ($api, $streams, $factory) {
        $request = $factory->createServerRequest("POST", "http://localhost/fs")
            ->withQueryParams(["path" => $path, "type" => $type, "hash" => $hash])
            ->withHeader("Content-Type", $multipart ? "multipart/form-data; boundary=test" : "text/plain")
            ->withParsedBody($fields);
        if ($upload) {
            $request = $request->withUploadedFiles([
                "file" => new UploadedFile($streams->createStream($content), "original.txt", "text/plain", strlen($content)),
            ]);
        } elseif (!$multipart) {
            $request = $request->withBody($streams->createStream($content));
        }
        return $api->create($request, new Response(), []);
    };
    $check = function ($condition, $message) {
        if (!$condition) {
            throw new RuntimeException($message);
        }
    };
    $status = function ($response, $expected, $message) use ($check) {
        $check($response->getStatusCode() === $expected, $message . ": " . $response->getStatusCode() . " " . $response->getBody());
    };

    $files[] = $base . "/original.txt";
    $status($create(".", "file", ""), 200, "empty upload");
    $check(file_get_contents($base . "/original.txt") === "", "empty content");
    $status($create(".", "file", "new", ["force" => "false"]), 406, "force=false");
    $check(file_get_contents($base . "/original.txt") === "", "force=false must not overwrite");
    $status($create(".", "file", "0", ["force" => "true"]), 200, "force=true");
    $check(file_get_contents($base . "/original.txt") === "0", "content 0");
    $status($create(".", "file", "new", ["force" => "invalid"]), 400, "invalid force");
    $status($create(".", "file", "", [], false), 400, "missing file");

    $files[] = $base . "/a+b%20.txt";
    $status($create(".", "file", "direct", ["filename" => "a+b%20.txt"]), 200, "literal filename");
    $check(file_get_contents($base . "/a+b%20.txt") === "direct", "literal filename content");
    $status($create(".", "file", "encoded", [
        "filename" => rawurlencode("a+b%20.txt"), "filenameEncoding" => "uri", "force" => "true",
    ]), 200, "encoded filename");
    $check(file_get_contents($base . "/a+b%20.txt") === "encoded", "encoded filename content");
    $status($create(".", "file", "x", ["filename" => "../escape.txt"]), 400, "path traversal");
    $status($create(".", "file", "x", ["filename" => ".hidden"]), 403, "hidden filename");
    $status($create(".", "file", "x", ["filename" => "readonly"]), 403, "read-only mount");
    $status($create("readonly", "file", "x"), 403, "read-only mount directory");
    $status($create("readonly/subdirectory", "file", "x"), 403, "read-only mount descendant");
    $status($create("./readonly", "file", "x"), 403, "normalized read-only mount directory");

    foreach (["readonly.txt", "readonlysuffix.xml"] as $name) {
        $files[] = $base . "/" . $name;
        $status($create(".", "file", "content", ["filename" => $name]), 200, "mount prefix filename " . $name);
        $check(file_get_contents($base . "/" . $name) === "content", "mount prefix filename content");
    }

    $files[] = $base . "/hash.txt";
    $hash = sprintf("%u", crc32("hash content"));
    $status($create(".", "file", "hash content", ["filename" => "hash.txt"], true, true, $hash), 200, "valid hash");
    $status($create(".", "file", "changed", ["filename" => "hash.txt", "force" => "true"], true, true, $hash), 405, "invalid hash");
    $check(file_get_contents($base . "/hash.txt") === "hash content", "invalid hash must not overwrite");

    $files[] = $base . "/legacy.txt";
    $status($create("legacy.txt", "file", "legacy", [], false, false), 200, "legacy raw body");
    $check(file_get_contents($base . "/legacy.txt") === "legacy", "legacy content");
    $status($create("new-dir", "dir", "", [], false), 200, "directory");
    $check(is_dir($base . "/new-dir"), "directory created");
    echo "Filesystem create tests passed\n";
} finally {
    foreach ($files as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
    if (is_dir($base . "/new-dir")) {
        rmdir($base . "/new-dir");
    }
    rmdir($base . "/readonly");
    rmdir($base);
}
