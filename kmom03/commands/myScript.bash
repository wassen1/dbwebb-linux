#!/bin/bash
#
# A template for creating command line scripts taking options, commands
# and arguments.
#
# Exit values:
#  0 on success
#  1 on failure
#



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
        "  reverse [any string]     Reverses given string."
        "  factors [numbers ...]    Find the number's prime factor for every number given."
        "  starwars                 Plays towel.blinkenlights. Star wars!"
        ""
        "Options:"
        "  --help, -h     Print help."
        "  --version, -h  Print version."
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
# Function for reversing given phrase
#
function app-reverse {
    local unReversed=$*
    
    echo $unReversed | rev
}

function app-factors {
    # set -x
    while (( $# ))
        do
        n=$1
        i=2
        printf "%s" "$n:"
        while (( $n > 1 ))
        do
            while (( $n%$i == 0 )) #no rest
            do
                printf "%s" " $i"
                n=$(( $n/$i )) #reminder
            done
            i=$(( $i+1 ))
        done
        shift
        echo
    done
    # set +x
}
function app-starwars {
    telnet towel.blinkenlights.nl
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
        
        reverse         \
        | factors       \
        | starwars)
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
