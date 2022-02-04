#!/bin/bash
set -e

touch endpoint.txt
echo "{ \"ServiceEndpoint\": \"$(serverless info --verbose | grep 'Base URL' | sed s/Base\ URL\:\ //g)\" }" > endpoint.txt
echo "WebSocket endpoint saved on endpoint.txt!"

