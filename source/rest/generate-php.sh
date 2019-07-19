#!/bin/bash

npx openapi-generator generate -i ./openapi.yaml -g php-slim -o ./php
