# php-base - PHP Slim Server library for CometVisu Manager backend

* [OpenAPI Generator](https://openapi-generator.tech)
* [Slim Framework Documentation](https://www.slimframework.com/docs/)

## Requirements

* Web server with URL rewriting
* PHP 7.0 or newer

This package contains `.htaccess` for Apache configuration.
If you use another server(Nginx, HHVM, IIS, lighttpd) check out [Web Servers](https://www.slimframework.com/docs/v3/start/web-servers.html) doc.

## Installation via [Composer](https://getcomposer.org/)

Navigate into your project's root directory and execute the bash command shown below.
This command downloads the Slim Framework and its third-party dependencies into your project's `vendor/` directory.
```bash
$ composer install
```

## Start devserver

Run the following command in terminal to start localhost web server, assuming `./php-slim-server/` is public-accessible directory with `index.php` file:
```bash
$ php -S localhost:8888 -t php-slim-server
```
> **Warning** This web server was designed to aid application development.
> It may also be useful for testing purposes or for application demonstrations that are run in controlled environments.
> It is not intended to be a full-featured web server. It should not be used on a public network.

## Tests

### PHPUnit

This package uses PHPUnit 6 or 7(depends from your PHP version) for unit testing.
[Test folder](test) contains templates which you can fill with real test assertions.
How to write tests read at [PHPUnit Manual - Chapter 2. Writing Tests for PHPUnit](https://phpunit.de/manual/6.5/en/writing-tests-for-phpunit.html).

#### Run

Command | Target
---- | ----
`$ composer test` | All tests
`$ composer test-apis` | Apis tests
`$ composer test-models` | Models tests

#### Config

Package contains fully functional config `./phpunit.xml.dist` file. Create `./phpunit.xml` in root folder to override it.

Quote from [3. The Command-Line Test Runner — PHPUnit 7.4 Manual](https://phpunit.readthedocs.io/en/7.4/textui.html#command-line-options):

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

Switch on option in `./index.php`:
```diff
    /**
     * When true, additional information about exceptions are displayed by the default
     * error handler.
     * Default: false
     */
--- // 'displayErrorDetails' => false,
+++ 'displayErrorDetails' => true,
```

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
*AbstractRequestproxyApi* | **getProxied** | **GET** /proxy | Can be used as a proxy to avoid CORS errors e.g. when loading images that need authorization requests


## Models

* OpenAPIServer\Model\DataProviderEntry
* OpenAPIServer\Model\EnvironmentState
* OpenAPIServer\Model\FsEntry
* OpenAPIServer\Model\InlineObject
* OpenAPIServer\Model\ReadResponse


