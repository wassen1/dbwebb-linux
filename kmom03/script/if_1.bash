#!/bin/bash
#A script witch takes an argument, an integer and tests if it is greater than 5

declare -i x=$1
if [ "$x" -gt 5 ]; then
echo "$x is greater than 5."
else
echo "$x is NOT greater than 5."
fi