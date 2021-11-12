#!/bin/bash

echo "Pool size,Min,Max,Avg"

for i in {1..100}
do
    MAX_POOL_SIZE=$i node experiment.js
done