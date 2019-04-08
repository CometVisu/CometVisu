.. _format:

Format
======

The format attribute can influence the formatting of the display
of values. For this, the syntax of the format known from
"printf" is used. **Note the point between the % and the decimal place!**

+----------+-------------------------------------+------------+
| Format   | Output                              | Example    |
+----------+-------------------------------------+------------+
| %.0f     | A value without decimal places      | 31         |
+----------+-------------------------------------+------------+
| %.1f     | A value with 1 decimal places       | 31.0       |
+----------+-------------------------------------+------------+
| %.2f     | A value with 2 decimal places       | 31.00      |
+----------+-------------------------------------+------------+
| %.3f     | A value with 3 decimal places       | 31.000     |
+----------+-------------------------------------+------------+
| %.4f     | A value with 4 decimal places       | 31.0000    |
+----------+-------------------------------------+------------+

A format can also be entered under Format. This is simply
placed behind the decimal separator. For example:

+-------------------+---------------------------------------------------+--------------------+
| Format            | Output                                            | Example            |
+-------------------+---------------------------------------------------+--------------------+
| %.0f %%           | A value without decimal places and % as Unit      | 31 %               |
+-------------------+---------------------------------------------------+--------------------+
| %.1f °C           | A value with 1 decimal places and °C as Unit      | 31.0 °C            |
+-------------------+---------------------------------------------------+--------------------+
| %.2f km/h         | A value with 2 decimal places and km/h as Unit    | 31.00 km/h         |
+-------------------+---------------------------------------------------+--------------------+

.. HINT::

    If you want to use a % character you have to use %% (otherwise
    there will be error messages depending on the browser you are using,
    since the single % might be interpreted as a control character)
