#!/bin/bash
#Handling different arguments
    #Example if statement
    # if [ "$1" = "d" ]; then
    #     echo $(date)
    # elif [ "$1" = "n" ]; then
    #     echo ${1..20}
    # else
    #   echo "not valid"
    # fi
case $1 in
    d ) echo $(date)
    ;;
    n ) echo {1..20}
    ;;
    a ) if [ $# -gt 1 ]; then
        echo $2
        else
            echo "Missing argument"
        fi
    ;;
    # a ) [[ $2 ]] && printf "$2\n"
    # ;;
    * ) echo "not valid"
esac
