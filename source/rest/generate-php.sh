#!/bin/bash

npx openapi-generator generate -i ./openapi.yaml -g php-slim -o ./php

# delete generated model as we do not use it
rm -r ./php/lib/Model
