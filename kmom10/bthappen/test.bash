#!/usr/bin/env bash
# ${var+x} is a parameter expansion which evaluates to null 
# if var is unset and substitutes the string "x" otherwise
if ! [[ ${LINUX_PORT+x} ]]; then
    LINUX_PORT='1337'
    #printf "%s\n" "Setting LINUX_PORT to default 1337."
fi

if ! [[ ${LINUX_SERVER+x} ]]; then
    LINUX_SERVER='localhost'
    # printf "%s\n" "Setting LINUX_SERVER to default localhost."
fi

# Name of the script
SCRIPT=$( basename "$0" )

# Current version
VERSION="1.0.0"

#Files
errorFile="errorFile.txt"
echo "" > $errorFile

#
# Message to display for usage and help.
#
function usage {
    local txt=(
        "Utility $SCRIPT for testing server routes."
        "Usage: $SCRIPT [option]"
       
        "Options:"
        "  --help, -h     Print help."
        "  --version, -v  Print version."
        "  --verbose      Print also response body."
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
# Function for verbose
#
function verbose {
    app-test --verbose
}

#
# Function for test
#
function app-test {
    local option="$1"
    local isOk="All tests are OK"

    PARTURL=('/' '/room/list' '/room/list?max=5' '/room/list?max=-5' '/room/view/id/2-215' '/room/view/id/H475' '/room/view/id/H528A' '/room/view/house/H-huset' '/room/view/house/H-huset?max=5' '/room/view/house/C-huset?max=5' '/room/search/Center' '/room/search/4?max=5' '/room/search/Karls?max=5' '/room/searchp/C-huset' '/room/searchp/4?max=5')
    for i in "${PARTURL[@]}"; 
      do 
        echo "Testing URL: $LINUX_SERVER:$LINUX_PORT$i"
        echo -n "Response code: "
        respcode=$(curl -s -o /dev/null -w "%{http_code}" $LINUX_SERVER:$LINUX_PORT$i)
        echo $respcode
        if ! [[ $respcode = "200" ]]; then
            isOk="These routes have errors:"
            echo $LINUX_SERVER:$LINUX_PORT$i >> $errorFile
            echo
        fi
        if [[ $option = "--verbose" ]]; then
            echo -n "Response body:"
            curl -s $LINUX_SERVER:$LINUX_PORT$i
            echo
        fi
        echo
      done
    echo -n $isOk
    cat $errorFile
    echo
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

        --verbose)
            verbose
            exit 0
        ;;
        
        # test)
        #     command=$1
        #     shift
        #     app-$command $*
        #     exit 0
        # ;;
        
        *)
            badUsage "Option/command not recognized."
            exit 1
        ;;
        
    esac
done

app-test
exit 0