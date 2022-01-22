#!/usr/bin/env python
# -*- coding: utf-8 -*-

# copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of the GNU General Public License as published by the Free
# Software Foundation; either version 3 of the License, or (at your option)
# any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA

import sys
import os
import sh
from argparse import ArgumentParser
import threading
import socket
import errno
import json
import shutil
from sh import npm

from socketserver import ThreadingMixIn
from http.server import SimpleHTTPRequestHandler, HTTPServer


class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
    """ threadable HTTPServer """
    pass


class MutedHttpRequestHandler(SimpleHTTPRequestHandler, object):

    def do_GET(self):
        if self.path.startswith("/rest/cv/r"):
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.end_headers()
            print("SSE request received")
        else:
            super(MutedHttpRequestHandler, self).do_GET()


    """ Mute the log messages """
    def log_message(self, format, *args):
        pass


def prepare_replay(file):
    with open(os.path.join("compiled", "source", "replay-log.js"), "w") as target:
        with open(file) as source:
            data = source.read()
            target.write('var replayLog = %s;' % data)

            return json.loads(data)["data"]["runtime"]


def start_browser(url, browser="chrome", size="1024,768", open_devtools=False, user_agent=None):
    print("Starting browser %s..." % browser)

    user_dir = os.getcwd()+"/."+browser

    try:
        shutil.rmtree(user_dir)
    except OSError:
        pass

    if browser not in ["firefox", "chrome"]:
        print("browser %s not yet supported, falling back to chrome" % browser)
        browser = "chrome"

    if browser == "chrome":
        flags = [
            "--no-first-run", "--disk-cache-dir=/dev/null",
            "--disk-cache-size=1", "--window-size=%s" % size,
            "--user-data-dir=%s" % user_dir, "--disable-popup-blocking",
            "--media-cache-size=1"
        ]
        if open_devtools is True:
            flags.append("--auto-open-devtools-for-tabs")
        if user_agent is not None:
            flags.append("--user-agent=%s" % user_agent)

        flags.append("--app=%s" % url)
        sh.google_chrome(*flags)

    elif browser == "firefox":
        os.makedirs(user_dir)
        sh.firefox("--no-remote", "-CreateProfile", "replay "+user_dir)
        with open(os.path.join(user_dir, "prefs.js"), "w") as f:
            f.write('user_pref("dom.disable_open_during_load", false);\n')
            f.write('user_pref("datareporting.healthreport.service_enabled", false);\n')
            f.write('user_pref("browser.cache.disk.enable", false);\n')
            f.write('user_pref("browser.cache.disk.smart_size.enabled", false);\n')
            f.write('user_pref("browser.cache.disk.capacity", 0);\n')
            if user_agent is not None:
                f.write('user_pref("general.useragent.override", "%s");\n' % user_agent)
        dimension = size.split(",")
        flags = [
            "--no-remote", "--new-window", "--new-instance", "-width", "%s" % dimension[0],
            "-height", dimension[1], "--profile", user_dir, "-url", url
        ]
        sh.firefox(*flags)


def get_server(host="", port=9000, next_attempts=0):
    while next_attempts >= 0:
        try:
            server = ThreadingSimpleServer((host, port), MutedHttpRequestHandler)
            return server, port
        except socket.error as e:
            if e.errno == errno.EADDRINUSE:
                next_attempts -= 1
                port += 1
            else:
                raise


if __name__ == '__main__':
    parser = ArgumentParser(usage="%(prog)s - CometVisu documentation helper commands")

    parser.add_argument('file', type=str, help='log file', nargs='?')
    parser.add_argument('--devtools', '-d', action='store_true', dest='devtools', help='Open browser with dev tools')
    parser.add_argument('--globalErrorHandling', '-e', action='store_true', dest='global_error_handling', help='Enable globalErrorHandling')
    options, unknown = parser.parse_known_args()

    if options.file is None:
        print("please provide a log file")
        parser.print_help()
        sys.exit(0)

    # compile cv
    args = ['compile']
    if options.global_error_handling is True:
        args.extend(['--', '--set-env', 'qx.globalErrorHandling=true'])

    npm.run(*args, _out=sys.stdout, _err=sys.stderr)

    settings = prepare_replay(options.file)
    window_size = "%s,%s" % (settings["width"], settings["height"])
    browser_name = settings["browserName"] if settings["browserName"] is not None else "chrome"
    anchor = "#%s" % settings["anchor"] if "anchor" in settings and settings["anchor"] is not None else ""
    query = "?%s" % "&".join([key + "=" + value for key, value in settings["query"].items()]) if "query" in settings and settings["query"] is not None and len(settings["query"]) > 0 else ""

    print("Replaying log recorded with CometVisu:")
    print("  Branch:   %s" % settings["cv"]["BRANCH"])
    print("  Revision: %s" % settings["cv"]["REV"])
    print("  Version:  %s" % settings["cv"]["VERSION"])
    print("  Date:     %s" % settings["cv"]["DATE"])
    print("")

    print("Stop with Strg + c")
    print("")

    hostname = ""
    port = 9000

    # start server
    server, port = get_server(hostname, port, 10)

    try:
        thread = threading.Thread(target=server.serve_forever)
        thread.start()

        # open browser
        start_browser("http://localhost:%s/compiled/source/replay.html%s%s" % (port, query, anchor),
                      browser=browser_name, size=window_size, open_devtools=options.devtools)

        while thread.is_alive():
            thread.join(1)

    except (KeyboardInterrupt, SystemExit):
        print("aborted")
        server.shutdown()
        sys.exit()
