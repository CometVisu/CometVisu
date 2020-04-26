Development
===========

If you would like to contribute to the CometVisu project there are some things you should know
to get started.

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
