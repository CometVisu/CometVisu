.. _long-polling:

Long polling
^^^^^^^^^^^^

Reading inquiries
*****************

In long polling, the CometVisu connects to the backend and
leaves it open until the backend sends data. The initial request
for all values is answered immediately by the backend.
Subsequent requests will be answered as soon as a new value
arrives. This is then sent to the CometVisu, whereupon the
connection is closed and immediately rebuilt.

.. HINT::

    A special feature here is the internal *Watchdog* to call, which
    automatically ends a long polling request and restarted if
    no answer has come within 60 seconds.

Writing inquiries
*****************

If a new value is to be sent to the backend (because, for
example, the user has serviced a widget), a new request that
is completely independent of the read requests is sent to the
backend. Here, the backend only confirms the successful receipt
of the request, new values are always sent only via the read requests.
