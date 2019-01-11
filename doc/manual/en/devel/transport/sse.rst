.. _sse:

Server sent events (SSE)
^^^^^^^^^^^^^^^^^^^^^^^^

Reading inquiries
*****************

At *Server sent events*, a one-time read connection is established.
Initially, the backend sends all the requested values once, then only
changed values.

.. HINT::
        The browser automatically takes care of the restoration of the
        connection in case of abortions.
        Therefore, the internal *Watchdog* is usually not used in SSE.

However, the browser must support this technology. An overview of the
supported browsers is provided by `Caniuse <http://caniuse.com/eventsource/embed/>`__.

Writing inquiries
*****************

When a new value is to be sent to the backend (because, for example,
the user has serviced a widget), a new request that is completely
independent of the read requests is sent to the backend. Here, the
backend only confirms the successful receipt of the request, new
values are always sent only via the read requests.