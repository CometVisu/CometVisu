Development
===========

If you would like to contribute to the CometVisu project there are some things you should know
to get started.

Build environment
-----------------

The CometVisu provides a predefined build environment based on distrobox (https://github.com/89luca89/distrobox). 
Please check that homepage to see how to install distrobox on your system (you also need to install podman or docker).
It starts a container that contains everything you need to develop the cometvisu, including a webserver for testing.
This distrobox needs to be created once. For that you have to create a file with some environment variables called `.env`
in the root folder of your local CometVisu clone. There you can configure the webserver for your needs.
Internally the distrobox uses the same container that officially ships the CometVisu, you can use all environment parameters 
that are documented for that container, see https://hub.docker.com/r/cometvisu/cometvisu.
Example `.env` content for an openHAB backend:

```bash
BACKEND_NAME=openhab 
BACKEND_OPENHAB=/rest/ 
BACKEND_PROXY_SOURCE=/rest 
BACKEND_PROXY_TARGET=http://192.168.178.5:8080/rest
```

After that run `./create-distrobox` once and the box will be created and directly entered. This has to be done only once.
You can leave the distrobox with `exit` and enter it again with `distrobox enter cv`.

Use VS-Code in distrobox
########################

Read https://distrobox.it/posts/integrate_vscode_distrobox/

If you already have installed VS-Code on your host start following from "Second step, extensions".

In addition to that you have to create the file
`${HOME}/.config/Code/User/globalStorage/ms-vscode-remote.remote-containers/nameConfigs/cv.json`

with the following content:

```json
{
    "remoteUser": "${localEnv:USER}",
    "settings": {
        "dev.containers.copyGitConfig": false,
        "dev.containers.gitCredentialHelperConfigLocation": "none"
    }
}
```
to be able to work with your user rights instead of root inside the container.

When you did not install vs-code inside the distrobox but want to use the one installed on your host system check
"Open VSCode directly attached to our Distrobox" at the end of the integration documentation page linked above.
In addition to that, you can add this:

```bash
if [ -f /run/.containerenv ]; then
    NAME=$(grep name /run/.containerenv | awk -F'=' '{print $2}' | tr -d '"')
    alias code="distrobox-host-exec vscode-distrobox $NAME"
fi
```

to your `${HOME}/.bashrc`. Then you can start your hosts vs-code directly inside the container in the same way
as you do it outside a distrobox, e.g. with `code .`.

Preparation
-----------

The new build system requires a node environment. So you have to run `npm install` once to install
all required modules for development. 
The REST backend for the manager uses composer to install its dependencies. If you want to use the 
manager during development you have to install composer (https://getcomposer.org/doc/00-intro.md) 
and execute `composer install` in the folder `source/rest/manager`.

After cloning the sources or updating from 0.10.x you have to do the following steps once:

```
git submodule init
git submodule update
```
 
Building source and build versions
---------------------------------

**Short version**

Execute `npx qx compile --watch`, let your webserver serve the folder `compiled/source`, open
the URL of your webserver in your browser and start to develop.
If you need PHP support during development you can run a PHP server that serves the compiled source
version of the cometvisu by executing `npm run source`. 

**In Detail:**

Since version >= 0.11.0 the CometVisu sources are based on the
[Qooxdoo-Framework](http://www.qooxdoo.org) and since version 0.12.0 it uses the new qooxdoo compiler. 
To develop, test and debug your changes you can work with a source version of the code, 
which can be compiled by executing `npx qx compile` in your console.

The most useful build commands are:
* `npx qx compile` generates a source version of the cometvisu in the subfolder `compiled/source`.

    Ideal for debugging and development, just serve the folder with your favorite web server.
    
    If you add the `--watch` parameter the compilation will happen automatically whenever you change
    something in the code.
     
* `npx qx compile --target=build` generates a minified build version in the subfolder `compiled/build`.

    Not useful for debugging, only as a final test that the build is working. This is how CometVisu releases
    are made.
    
The qooxdoo compiler works as a transpiler, which requires a re-compilation after every change made in the code.
It is recommended to run the compiler in watch mode `npx qx compile --watch` during development.
In this mode the compiler will recognize every change made in the code and automatically re-compile.

You can change the output path of the compiler by adding `--set outputPath=<path>` to the compile command or
by setting the environment variable `CV_OUTPUT_PATH`. 
    
Pulling changes
---------------

If there have been changes in submodules of the project you have to run `git submodule update` to get those changes.

Other useful resources you may find useful during development are:

* The Qooxdoo-Documentation (only the core part): http://www.qooxdoo.org/current/
* The API: http://cometvisu.org/CometVisu/en/latest/api/

Running tests
-------------

Run all tests locally:

`grunt karma:debug`

Filter tests to run (by the content of the describe/it phrase of the tests):

`grunt karma:debug --grep=contains-this`

Generating Screenshots
----------------------

The documentation uses screenshots generated from widget examples. The screenshot system uses 
[Playwright](https://playwright.dev/) for browser automation.

### Setup

After running `npm install`, you need to install the Playwright browser:

```bash
npx playwright install chromium --with-deps
```

### Generating Screenshots

Generate all screenshots (requires a compiled source):

```bash
# First compile the source
npx qx compile

# Generate screenshots using Playwright
grunt screenshots-pw
```

### Options

The screenshot generation supports several options:

- `--source=<path>` - Path to the widget examples directory (default: `cache/widget_examples`)
- `--subDir=<dir>` - Only process a specific subdirectory (e.g., `manual`, `build`)
- `--files=<file>` - Only process a specific JSON file
- `--target=<target>` - Target folder (`source` or `build`, default: `source`)
- `--forced` - Force regeneration of all screenshots (ignore hash check)
- `--verbose` - Show verbose output
- `--lang=<language>` - Only process a specific language (e.g., `de`, `en`)

### Examples

```bash
# Generate all screenshots
grunt screenshots-pw

# Generate screenshots for a specific widget
grunt screenshots-pw --files=de_config_structure-tile_components_button_0.json

# Force regeneration with verbose output
grunt screenshots-pw --forced --verbose

# Generate only German screenshots
grunt screenshots-pw --lang=de

# Generate static screenshots from doc folder
grunt screenshots-pw --source=doc/manual/_screenshots/
```

Running in docker container
---------------------------

`docker run -d -p 8080:80 --name cometvisu-test -v "$PWD/compiled/source":/var/www/html php:8.0-apache`

Test with PHP 5.2 (Wiregate version)
`docker run -d -p 8080:80 --name cometvisu-test -v "$PWD/compiled/source":/var/www/html deminy/php-5.2`
