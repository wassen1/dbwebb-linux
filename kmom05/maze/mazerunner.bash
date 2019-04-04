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

# Files
gameInfo="gameInfo.txt"
gameId="gameId.txt"
maps="maps.txt"
info="info.txt"

#
# Message to display for usage and help.
#
function usage {
    local txt=(
        "Utility $SCRIPT for doing stuff."
        "Usage: $SCRIPT <command> [arguments]"
        ""
        "Command:"
        "  init                     Initialize the maze and generates a new gameid."
        "  maps                     Returns a list of all available maps. You need to call this before you can select a map."
        "  select   [<number>]        Loads the map as the current maze."
        "  enter                    Enters the maze."
        "  info                     Gets info about the room."
        "  go       [<direction>]   Walks away from the current room in selected direction."
        "  loop                     Automates some steps for you."
        ""
        "Options:"
        "  --help, -h     Print help."
        "  --version, -v  Print version."
    )
    printf "%s\n" "${txt[@]}"
}

function usage-loop {
    local txt=(
       "Enter the desired direction: 'south', 'north', 'east' or 'west'"
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
# Message to display when bad usage in loop.
#
function badUsage-loop {
    local message="$1"
    # local txt=(
    # )

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
# Function for start game
#
function app-init {
    curl -s -o $gameInfo $LINUX_SERVER:$LINUX_PORT/?type=csv
    tail -n 1 $gameInfo | cut -d ',' -f 2 > $gameId
    echo "$(tail -n 1 $gameInfo | cut -d ',' -f 1): $(cat $gameId)"
    echo
}



#
# Function for go to maps
#
function app-maps {
    curl -s $LINUX_SERVER:$LINUX_PORT/map?type=csv > $maps
    map1=$(tail -n1 "maps.txt" | cut -d "," -f 1)
    map2=$(tail -n1 "maps.txt" | cut -d "," -f 2)
    echo "1. $map1"
    echo "2. $map2"
    echo

}


#
# Function for to select a map.
#
function app-select {
    id=$(cat $gameId)
    map=$(tail -n1 "maps.txt" | cut -d "," -f $1)
   
    curl $LINUX_SERVER:$LINUX_PORT/$id/map/$map &> /dev/null
    echo "You selected: $map"
    echo
}

#
# Function for presenting available rooms.
#
function getAvailableRooms {
    for direction in 3 4 5 6
    do
        tmp=$(tail -n1 $info | cut -d "," -f $direction)
        if [[ "$tmp" = "-" ]]
        then
            continue
        else
            roomId=$(tail -n2 $info | cut -d"," -f$direction)
            rooms="$rooms $roomId"
        fi
    done
    echo $rooms
}

#
# Function for to enter a map
#
function app-enter {
    id=$(cat $gameId)
    if [[ -z "$1" ]]
    then
        curl -s $LINUX_SERVER:$LINUX_PORT/$id/maze?type=csv  > $info
    else
        roomId=$(tail -n1 $info | cut -d"," -f1)
        curl -s $LINUX_SERVER:$LINUX_PORT/$id/maze/$roomId/$1?type=csv > $info
    fi
    roomId=$(tail -n1 $info | cut -d"," -f1)
    description=$(tail -n1 $info | cut -d"," -f2)
    echo "You are in room: $roomId"
    echo "Description: $description"
    echo "You can go to: $(getAvailableRooms)"
    echo
}

#
# Function for info about a room
#
function app-info {
    roomId=$(tail -n1 $info | cut -d"," -f1)
    description=$(tail -n1 $info | cut -d"," -f2)
    echo "You are in room: $roomId"
    echo "Description: $description"
    echo "You can go to: $(getAvailableRooms)"
    echo
}

#
# Function for to go in choosen direction.
#
function app-go {
    app-enter $1
}

#
# Function that automates some step for the user.
#
function app-loop {
    echo "Initializes new game ..."
    app-init
    echo "Setting upp the maps ..."
    app-maps
    echo "Choose map and press enter:"
    while true
    do
        read map

        if [[ "$map" = 1 ]] || [[ "$map" = 2 ]]; then
            app-select $map
            app-enter
            break
        else
            local txt=(
                "Option/command not recognized."
                "Choose '1' or '2'"
            )
            printf "%s\n" "${txt[@]}"
        fi
    done

    while true
    do
        echo "Enter command:('help' for help, 'done' to quit)"
        echo
        read answer
        case "$answer" in
            help)
                usage-loop
            ;;

            done)
                exit 0
                ;;

            north \
            | south \
            | east \
            | west)
                app-go $answer
                ;;
            *)
                badUsage-loop "Option/command not recognized."
                echo 
                # exit 1
            ;;


        esac

    done
    
    
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
        
        init         \
        | maps       \
        | select    \
        | enter   \
        | info    \
        | go   \
        | loop)
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