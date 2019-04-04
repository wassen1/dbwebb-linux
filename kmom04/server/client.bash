#!/bin/env bash
# ${var+x} is a parameter expansion which evaluates to null 
# if var is unset and substitutes the string "x" otherwise
if ! [[ ${LINUX_PORT+x} ]]; then
    LINUX_PORT='1337'
    # printf "%s\n" "Setting LINUX_PORT to default 1337."
fi

if ! [[ ${LINUX_SERVER+x} ]]; then
    LINUX_SERVER='localhost'
    # printf "%s\n" "Setting LINUX_SERVER to default localhost."
fi

# Name of the script
SCRIPT=$( basename "$0" )

# Current version
VERSION="1.0.0"

#
# Message to display for usage and help.
#
function usage {
    local txt=(
        "Utility $SCRIPT for doing stuff."
        "Usage: $SCRIPT [options] <command> [arguments]"
        ""
        "Command:"
        "  hello                    Routes to /."
        "  html                     Routes to index.html"
        "  status                   Runs uname."
        "  sum      [numbers ...]   Returns the sum of all given arbuments."
        "  filter   [numbers ...]   Returns values <= 42."
        "  404                      Returns not Found."
        "  all                      Runs all previous commands."
        ""
        "Options:"
        "  --help, -h     Print help."
        "  --version, -v  Print version."
    )
    printf "%s\n" "${txt[@]}"
}

#
# Message to display when bad usage.
#
function badUsage {
    local message="$1"
    local txt=(
        "For an overview of the command, execute:"
        "$SCRIPT --help or $SCRIPT -h"
    )

    [[ $message ]] && printf "$message\n"
    
    printf "%s\n" "${txt[@]}"
}

#
# Message to display for version.
#
function version
{
    local txt=(
"$SCRIPT version $VERSION"
    )

    printf "%s\n" "${txt[@]}"
}

#
# Function for go to root
#
function app-hello {
    curl $LINUX_SERVER:$LINUX_PORT/
}

#
# Function for go to index.html
#
function app-html {
    curl $LINUX_SERVER:$LINUX_PORT/index.html
}

#
# Function for go to status
#
function app-status {
    curl $LINUX_SERVER:$LINUX_PORT/status
}



function app-sum {
    # set -x
    local txt=(
        $LINUX_SERVER:$LINUX_PORT/sum?
    )
    while (( $# ))
        do
        n=$1
        i=2
        # printf "%s" "$n:"
        txt="$txt&$n"
        shift
        # echo
    done
    # set +x
    echo $txt
    curl $txt
}

function app-filter {
    # set -x
    local txt=(
        $LINUX_SERVER:$LINUX_PORT/filter?
    )
    while (( $# ))
        do
        n=$1
        i=2
        # printf "%s" "$n:"
        txt="$txt&$n"
        shift
        # echo
    done
    # set +x
    curl $txt
}

#
# Function for go to 404
#
function app-404 {
    curl -I $LINUX_SERVER:$LINUX_PORT/$RANDOM
    # printf \\$(printf '%03o' $((65)))
    # echo $RANDOM
}


#
# Function for running all routes
#
function app-all {
    printf "%s\n" "Executed command: bash ./client.bash hello"
    bash ./client.bash hello
    echo
    echo
    printf "%s\n" "Executed command: bash ./client.bash html"
    bash ./client.bash html
    echo
    echo
    printf "%s\n" "Executed command: bash ./client.bash status"
    bash ./client.bash status
    echo
    echo
    printf "%s\n" "Executed command: bash ./client.bash sum 2 3 4"
    bash ./client.bash sum 2 3 4
    echo
    echo
    printf "%s\n" "Executed command: bash ./client.bash filter 2 3 4"
    bash ./client.bash filter 2 3 4
    echo
    echo
    printf "%s\n" "Executed command: bash ./client.bash 404"
    bash ./client.bash 404
}

#
# Process options
#
while (( $# ))
do
    case "$1" in
        
        --help | -h)
            usage
            exit 0
        ;;
        
        --version | -v)
            version
            exit 0
        ;;
        
        hello         \
        | html       \
        | status    \
        | sum   \
        | filter    \
        | 404   \
        | all)
            command=$1
            shift
            app-$command $*
            exit 0
        ;;
        
        *)
            badUsage "Option/command not recognized."
            exit 1
        ;;
        
    esac
done

badUsage
exit 1