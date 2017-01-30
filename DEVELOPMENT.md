Development
===========

If you would like to contribute to the CometVisu project there are some things you should know
to get started.

Since version >= 0.11.0 the CometVisu sources are based on the
 [Qooxdoo-Framework](http://www.qooxdoo.org). To develop, test and debug
your changes you can work with a source version of the code, which can be generated be executing 
`./generate.py source` on your console (python2 required).

Thre most useful build commands are:
* `./generate.py source` loads all used source files seperately.

    Ideal for debugging and development
        
* `./generate.py source-hybrid` loads the CometVisu source files seperately the used qooxdoo files as one single file

    Faster load time, also useful to debug and test the CometVisu code, but the qx.* sources are harder to debug
     
* `./generate.py build` generated a minified single source file

    Not useful for debugging only as a final test that the build is working. This is how CometVisu releases
    are made.
    
**Please note:**

Every time you add a new class-file to the sources are use a qx.* class that hasn't been used before
you have to re-run `./generate.py source` as this step makes sure that the new file gets included and loaded
by the browser. If you only change code in existing files you don't have to re-generate the source.

Other useful resources you may find useful during development are:

* The Qooxdoo-Documentation (only the core part): http://www.qooxdoo.org/current/
* The API: http://cometvisu.org/CometVisu/en/latest/api/