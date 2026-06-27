<?php
/* influx.inc.php
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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


namespace OpenAPIServer;

use Exception;

function query($q, $db = "", $auth = null)
{
    $apiConfig = include getcwd() . "/src/config.php";
    require realpath($apiConfig->configDir . "/hidden.php");

    if ($db) {
        $db = "&db=" . $db;
    }

    $context = null;
    $uri = "http://localhost:8086/query";

    // default to 'influx' when it is set in the hidden config but not set in the GET URL.
    if (null == $auth && array_key_exists("influx", $hidden)) {
        $influxKey = "influx";
    } else {
        $influxKey = $auth;
    }

    if (array_key_exists($influxKey, $hidden)) {
        if (array_key_exists("uri", $hidden[$influxKey])) {
            $uri = $hidden[$influxKey]["uri"];
        }

        $opts = [
            "http" => [
                "method" => "GET",
                "header" =>
                    "Authorization: Basic " .
                    base64_encode(
                        $hidden[$influxKey]["user"] .
                            ":" .
                            $hidden[$influxKey]["pass"]
                    ),
            ],
        ];
        if (
            array_key_exists("selfsigned", $hidden[$influxKey]) &&
            "true" == $hidden[$influxKey]["selfsigned"]
        ) {
            $opts["ssl"] = [
                "verify_peer" => false,
                "allow_self_signed" => true,
                "verify_peer_name" => false,
            ];
        }

        $context = stream_context_create($opts);
    }

    $content = @file_get_contents(
        $uri . "?q=" . urlencode($q) . $db,
        false,
        $context
    );
    if (false === $content) {
        $error = error_get_last();
        throw new Exception($error["message"], 501);
    }
    return $content;
}

function getFields($tsParameter, $auth)
{
    $ts = explode("/", $tsParameter);
    if ("" == $ts[0] || "" == $ts[1]) {
        return "Error: wrong measurement parameter [" . $tsParameter . "]";
    }

    $arrData = [
        ["value" => "*", "label" => "Default: *", "forceOnlyLabel" => 1],
    ];

    $fieldsArr = json_decode(
        query("SHOW FIELD KEYS FROM " . $ts[1], $ts[0], $auth),
        true
    );
    $fields = $fieldsArr["results"][0]["series"][0]["values"];
    if (null != $fields) {
        foreach ($fields as $thisField) {
            $l = "";
            $r = "";

            if ("string" == $thisField[1]) {
                $l = "[";
                $r = "]";
            }
            $arrData[] = [
                "value" => $thisField[0],
                "label" => sprintf(
                    "%s%s (%s)%s",
                    $l,
                    $thisField[0],
                    $thisField[1],
                    $r
                ),
                "forceOnlyLabel" => 1,
            ];
        }
    }

    return $arrData;
}

function getTags($tsParameter, $auth)
{
    $ts = explode("/", $tsParameter);
    if ("" == $ts[0] || "" == $ts[1]) {
        return "Error: wrong measurement parameter [" . $tsParameter . "]";
    }

    $resSeries = [];
    $measurements = [];

    $seriesArr = json_decode(
        query("SHOW SERIES FROM " . $ts[1], $ts[0], $auth),
        true
    );
    $series = $seriesArr["results"][0]["series"][0]["values"];
    if (null != $series) {
        foreach ($series as $thisSeries) {
            $list = explode(",", $thisSeries[0]);
            $measurement = array_shift($list);
            if (!array_key_exists($measurement, $measurements)) {
                $measurements[$measurement] = [];
            }

            foreach ($list as $tag) {
                $tagKV = explode("=", $tag);
                if (array_key_exists($tagKV[0], $measurements[$measurement])) {
                    $measurements[$measurement][$tagKV[0]][$tagKV[1]] = 1; // fake set operation
                } else {
                    $measurements[$measurement][$tagKV[0]] = [$tagKV[1] => 1]; // fake set operation
                }
            }
        }
        // translate fake set to real set/array
        foreach ($measurements as $measurement => $measurementValues) {
            foreach ($measurementValues as $tag => $tagValues) {
                $arrData[$tag] = array_keys($tagValues);
            }
        }
    }

    return $arrData;
}
