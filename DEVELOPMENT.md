Development
===========

If you would like to contribute to the CometVisu project there are some things you should know
to get started.

Preparation
-----------

The new build system requires python2 and grunt. Also you have to run `npm install` once,
because at least the build-task (explained later) includes a grunt task which minifies included
external dependencies.

After cloning the sources or updating from 0.10.x you have to do the following steps once:

```
git submodule init
git submodule update
```
 
Building source and build versions
---------------------------------

Since version >= 0.11.0 the CometVisu sources are based on the
 [Qooxdoo-Framework](http://www.qooxdoo.org). To develop, test and debug
your changes you can work with a source version of the code, which can be generated be executing 
`./generate.py source` on your console (python2 required).

The most useful build commands are:
* `./generate.py source` loads all used source files separately.

    Ideal for debugging and development
        
* `./generate.py source-hybrid` loads the CometVisu source files separately the used qooxdoo files as one single file

    Faster load time, also useful to debug and test the CometVisu code, but the qx.* sources are harder to debug
     
* `./generate.py build` generated a minified single source file

    Not useful for debugging only as a final test that the build is working. This is how CometVisu releases
    are made.
    
Pulling changes
---------------

Everytime you pull changes from the main repository into you local clone you have to re-generate the source 
(`./generate.py source`) if source files have been added or deleted and update the submodules if the 
 qooxdoo submodule got changed too (`git submodule update`).
 
If you are not sure which of the two steps above is needed just execute them both.
    
**Please note:**

Every time you add a new class-file to the sources are use a qx.* class that hasn't been used before
you have to re-run `./generate.py source` as this step makes sure that the new file gets included and loaded
by the browser. If you only change code in existing files you don't have to re-generate the source.

Other useful resources you may find useful during development are:

* The Qooxdoo-Documentation (only the core part): http://www.qooxdoo.org/current/
* The API: http://cometvisu.org/CometVisu/en/latest/api/