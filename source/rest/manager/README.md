# php-base - PHP Slim 4 Server library for CometVisu Manager backend

* [OpenAPI Generator](https://openapi-generator.tech)
* [Slim 4 Documentation](https://www.slimframework.com/docs/v4/)

This server has been generated with [Slim PSR-7](https://github.com/slimphp/Slim-Psr7) implementation.

## Requirements

* Web server with URL rewriting
* PHP 8.0 or newer

This package contains `.htaccess` for Apache configuration.
If you use another server(Nginx, HHVM, IIS, lighttpd) check out [Web Servers](https://www.slimframework.com/docs/v3/start/web-servers.html) doc.

## Installation via [Composer](https://getcomposer.org/)

Navigate into your project's root directory and execute the bash command shown below.
This command downloads the Slim Framework and its third-party dependencies into your project's `vendor/` directory.
```bash
$ composer install
```

## Add configs

Application requires at least one config file(`config/dev/config.inc.php` or `config/prod/config.inc.php`). You can use [config/dev/example.inc.php](config/dev/example.inc.php) as starting point.

## Start devserver

Run the following command in terminal to start localhost web server, assuming `./php-slim-server/public/` is public-accessible directory with `index.php` file:
```bash
$ php -S localhost:8888 -t php-slim-server/public
```
> **Warning** This web server was designed to aid application development.
> It may also be useful for testing purposes or for application demonstrations that are run in controlled environments.
> It is not intended to be a full-featured web server. It should not be used on a public network.

## Tests

### PHPUnit

This package uses PHPUnit 8 or 9(depends from your PHP version) for unit testing.
[Test folder](tests) contains templates which you can fill with real test assertions.
How to write tests read at [2. Writing Tests for PHPUnit - PHPUnit 8.5 Manual](https://phpunit.readthedocs.io/en/8.5/writing-tests-for-phpunit.html).

#### Run

Command | Target
---- | ----
`$ composer test` | All tests
`$ composer test-apis` | Apis tests
`$ composer test-models` | Models tests

#### Config

Package contains fully functional config `./phpunit.xml.dist` file. Create `./phpunit.xml` in root folder to override it.

Quote from [3. The Command-Line Test Runner — PHPUnit 8.5 Manual](https://phpunit.readthedocs.io/en/8.5/textui.html#command-line-options):

> If phpunit.xml or phpunit.xml.dist (in that order) exist in the current working directory and --configuration is not used, the configuration will be automatically read from that file.

### PHP CodeSniffer

[PHP CodeSniffer Documentation](https://github.com/squizlabs/PHP_CodeSniffer/wiki). This tool helps to follow coding style and avoid common PHP coding mistakes.

#### Run

```bash
$ composer phpcs
```

#### Config

Package contains fully functional config `./phpcs.xml.dist` file. It checks source code against PSR-1 and PSR-2 coding standards.
Create `./phpcs.xml` in root folder to override it. More info at [Using a Default Configuration File](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Advanced-Usage#using-a-default-configuration-file)

### PHPLint

[PHPLint Documentation](https://github.com/overtrue/phplint). Checks PHP syntax only.

#### Run

```bash
$ composer phplint
```

## Show errors

Switch on option in your application config file like:
```diff
 return [
     'slimSettings' => [
-        'displayErrorDetails' => false,
+        'displayErrorDetails' => true,
         'logErrors' => true,
         'logErrorDetails' => true,
     ],
```

## Mock Server
For a quick start uncomment [mocker middleware options](config/dev/example.inc.php#L67-L94) in your application config file.

Used packages:
* [Openapi Data Mocker](https://github.com/ybelenko/openapi-data-mocker) - first implementation of OAS3 fake data generator.
* [Openapi Data Mocker Server Middleware](https://github.com/ybelenko/openapi-data-mocker-server-middleware) - PSR-15 HTTP server middleware.
* [Openapi Data Mocker Interfaces](https://github.com/ybelenko/openapi-data-mocker-interfaces) - package with mocking interfaces.

## API Endpoints

All URIs are relative to *http://localhost*

> Important! Do not modify abstract API controllers directly! Instead extend them by implementation classes like:

```php
// src/Api/PetApi.php

namespace OpenAPIServer\Api;

use OpenAPIServer\Api\AbstractPetApi;

class PetApi extends AbstractPetApi
{

    public function addPet($request, $response, $args)
    {
        // your implementation of addPet method here
    }
}
```

Place all your implementation classes in `./src` folder accordingly.
For instance, when abstract class located at `./lib/Api/AbstractPetApi.php` you need to create implementation class at `./src/Api/PetApi.php`.

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AbstractConfigApi* | **saveHiddenConfig** | **PUT** /config/hidden | Save the hidden config
*AbstractConfigApi* | **createHiddenConfig** | **POST** /config/hidden/{section}/{key} | Creates a new config option
*AbstractConfigApi* | **deleteHiddenConfig** | **DELETE** /config/hidden/{section}/{key} | Delete config option
*AbstractConfigApi* | **getHiddenConfig** | **GET** /config/hidden/{section}/{key} | Provides the value of a config option
*AbstractConfigApi* | **updateHiddenConfig** | **PUT** /config/hidden/{section}/{key} | Changes the value of an existing config option
*AbstractDataproviderApi* | **getAddresses** | **GET** /data/addresses | Returns the list of available addresses.
*AbstractDataproviderApi* | **getDesigns** | **GET** /data/designs | Returns the list of available designs.
*AbstractDataproviderApi* | **getInfluxDBFields** | **GET** /data/influxdbfields | Returns the list of available influx database fields.
*AbstractDataproviderApi* | **getInfluxDBTags** | **GET** /data/influxdbtags | Returns the list of available influx database tags.
*AbstractDataproviderApi* | **getInfluxDBs** | **GET** /data/influxdbs | Returns the list of available influx databases.
*AbstractDataproviderApi* | **getRRDs** | **GET** /data/rrds | Returns the list of available RRDs.
*AbstractFsApi* | **checkEnvironment** | **GET** /fs/check | Check filesystem environment (access rights, etc)
*AbstractFsApi* | **create** | **POST** /fs | Create a new file or folder on the host
*AbstractFsApi* | **delete** | **DELETE** /fs | Deletes a file/folder
*AbstractFsApi* | **move** | **PUT** /fs/move | Move folder or file to a new place
*AbstractFsApi* | **read** | **GET** /fs | Return directory listing or file content
*AbstractFsApi* | **update** | **PUT** /fs | Update an existing file


## Models

* OpenAPIServer\Model\DataProviderEntry
* OpenAPIServer\Model\EnvironmentState
* OpenAPIServer\Model\FsEntry
* OpenAPIServer\Model\InlineObject
* OpenAPIServer\Model\ReadResponse


