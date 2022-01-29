<?php

namespace OpenAPIServer\Api;

use OpenAPIServer\Helper;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Exception;
use OpenAPIServer;

require_once getcwd() . "/src/parse_ini.inc.php";
require_once getcwd() . "/src/influx.inc.php";

class DataproviderApi extends AbstractDataproviderApi
{
    private $apiConfig;

    public function __construct(ContainerInterface $container = null)
    {
        parent::__construct($container);
        $this->apiConfig = include getcwd() . "/src/config.php";
    }

    private function respondError(ResponseInterface $response, Exception $e)
    {
        return Helper::withJson(
            $response,
            ["message" => $e->getMessage()],
            $e->getCode()
        );
    }

    /**
     * GET getAddresses
     * Summary: Returns the list of available addresses.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getAddresses(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        // list of group-addresses, main-groups and middle-groups
        $arrGA = [];
        $arrHG = [];
        $arrMG = [];

        foreach ($this->apiConfig->addressFiles["addresses"] as $file) {
            if (file_exists($file) && filesize($file) > 0) {
                $arrGA = parse_ini($file);
            }
        }

        foreach ($this->apiConfig->addressFiles["mainGroups"] as $file) {
            if (file_exists($file) && filesize($file) > 0) {
                $arrHG = parse_ini($file);
            }
        }

        foreach ($this->apiConfig->addressFiles["middleGroups"] as $file) {
            if (file_exists($file) && filesize($file) > 0) {
                $arrMG = parse_ini($file);
            }
        }

        // create a list of ALL group-addresses, multi-dimensional
        $arrAdresses = [];

        // sort the group addresses
        uksort($arrGA, [$this, "GASort"]);

        foreach ($arrGA as $strGA => $arrData) {
            $arrGAParts = explode("/", $strGA, 3);

            $strHG = "";
            if (true === isset($arrHG[$arrGAParts[0]])) {
                $strHG = utf8_encode($arrHG[$arrGAParts[0]]["name"]);
            }

            $strMG = "";
            if (true === isset($arrMG[$arrGAParts[1]])) {
                $strMG = utf8_encode($arrMG[$arrGAParts[1]]["name"]);
            }

            $arrAdresses[$strHG . " " . $strMG][] = [
                "value" => $strGA,
                "label" => utf8_encode($arrData["name"]),
                "hints" => [
                    "transform" => "DPT:" . $arrData["DPTSubId"],
                ],
            ];
        }
        return Helper::withJson($response, $arrAdresses);
    }

    /**
     * GET getDesigns
     * Summary: Returns the list of available designs.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getDesigns(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $designs = [];
        if ($handle = opendir($this->apiConfig->designsDir)) {
            while (false !== ($entry = readdir($handle))) {
                $filePath = realpath(
                    $this->apiConfig->designsDir . "/" . $entry
                );
                if (is_dir($filePath) && substr($entry, 0, 1) !== ".") {
                    array_push($designs, $entry);
                }
            }
        }
        return Helper::withJson($response, $designs);
    }

    /**
     * GET getInfluxDBFields
     * Summary: Returns the list of available influx database fields.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getInfluxDBFields(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $auth = $request->getQueryParam("auth");
        $measurement = $request->getQueryParam("measurement");
        try {
            $data = OpenAPIServer\getFields($measurement, $auth);
        } catch (Exception $e) {
            return $this->respondError($response, $e);
        }
        return Helper::withJson($response, $data);
    }

    /**
     * GET getInfluxDBTags
     * Summary: Returns the list of available influx database tags.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getInfluxDBTags(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $auth = $request->getQueryParam("auth");
        $measurement = $request->getQueryParam("measurement");
        try {
            $data = OpenAPIServer\getTags($measurement, $auth);
        } catch (Exception $e) {
            return $this->respondError($response, $e);
        }
        return Helper::withJson($response, $data);
    }

    /**
     * GET getInfluxDBs
     * Summary: Returns the list of available influx databases.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getInfluxDBs(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $auth = $request->getQueryParam("auth");

        $arrData = [];
        try {
            $databases = json_decode(
                \OpenAPIServer\query("show databases", null, $auth),
                true
            );
            foreach (
                $databases["results"][0]["series"][0]["values"]
                as $databaseEntry
            ) {
                $database = $databaseEntry[0];
                if ("_internal" == $database) {
                    continue;
                }

                $resSeries = [];
                $measurements = [];

                $seriesArr = json_decode(
                    \OpenAPIServer\query("SHOW MEASUREMENTS", $database, $auth),
                    true
                );
                $series = $seriesArr["results"][0]["series"][0]["values"];
                if (null != $series) {
                    foreach ($series as $thisSeries) {
                        $arrData[] = [
                            "value" => $database . "/" . $thisSeries[0],
                            "label" => $database . "/" . $thisSeries[0],
                        ];
                    }
                }
            }
        } catch (Exception $e) {
            return $this->respondError($response, $e);
        }

        return Helper::withJson($response, $arrData);
    }

    /**
     * GET getRRDs
     * Summary: Returns the list of available RRDs.
     * Output-Formats: [application/json]
     *
     * @param ServerRequestInterface $request  Request
     * @param ResponseInterface      $response Response
     * @param array|null             $args     Path arguments
     *
     * @return ResponseInterface
     * @throws Exception to force implementation class to override this method
     */
    public function getRRDs(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ) {
        $sensors = null;
        foreach ($this->apiConfig->onewire["sensors"] as $file) {
            if (file_exists($file)) {
                $sensors = parse_ini($file);
                break;
            }
        }
        $arrData = [];

        foreach ($this->apiConfig->onewire["rrdDir"] as $strFilename) {
            $strFileBasename = basename($strFilename, ".rrd");
            $arrRRDParts = explode("_", $strFileBasename, 2);

            $arrData[] = [
                "value" => utf8_encode($strFileBasename),
                "label" => utf8_encode($sensors[$arrRRDParts[0]]["name"]),
            ];
        }
        return Helper::withJson($response, $arrData);
    }

    /**
     * Sort two GroupAddresses, natural sorting
     *
     * @param string    $a
     * @param string    $b
     */
    private static function GASort($a, $b)
    {
        $strA = preg_replace('/(^|\/)(\d)(\/|$)/', '${1}0${2}${3}', $a);
        $strB = preg_replace('/(^|\/)(\d)(\/|$)/', '${1}0${2}${3}', $b);

        return strcmp($strA, $strB);
    }
}
