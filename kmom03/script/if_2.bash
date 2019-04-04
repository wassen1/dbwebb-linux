#!/bin/bash
#A script witch takes an argument, an integer and tests if it is greater, lower or equal than 5
declare -i x=$1

if [ "$x" -gt 5 ]; then
echo "Higher!"
elif [ "$x" -eq 5 ]; then
echo "Same!"
elif [ "$x" -lt 5 ]; then
echo "Lower!"
fi