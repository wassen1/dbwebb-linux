#!/usr/bin/env bash

cat <<EOF > salar.json
{
  "salar": [
EOF

colNames=$(head -n2 salar.csv | tail -n1 | cut -d ',' -f 1- | tr ',' ' ') # Column names
num=$(echo "$colNames" | wc -w)         # Number of columns

sequence=$(echo $(seq $num))
aSeq=''                                 # A sequence with "a" as prefix
for el in $sequence
do
  aSeq="$aSeq a${el}"
done
IFS=' ' read -r -a aSeqArr <<< "$aSeq"  # place the sequence into an array

count=$(( 0 ))
items=( )
while IFS=',' read -r $aSeq _ ; do      # $aSeq are variables that reprecents the values from the csv
  if (( $count > 1 ))                   # excludes first row
  then
    iter=0
    keys=( )
    for key in $colNames
    do
      keys+=($'\t\t\t'"\""$key"\"": "\""${!aSeqArr[iter]}"\""$([[ $iter -lt $(( $num - 1 )) ]] && printf ',')$'\n')   # building the room object
      (( iter += 1 ))
    done
 
# Place the value keys in an object
cat <<EOF >> salar.json
    {
${keys[*]} 
    },
EOF
  fi


  (( count += 1 ))
done <salar.csv

sed "$ s/.$//" salar.json > salar.json.bup  # removes last character in file
mv salar.json.bup salar.json


cat <<EOF >> salar.json 
  ]
}
EOF

sed 's/""/null/g' salar.json > salar.json.bup # replace '""' with 'null'
mv salar.json.bup salar.json


# cat <<EOF > salar.json
# {
#     "salar": [
# EOF
# echo '{ "salar":    [' > salar.json
# count=$(( 0 ))
# items=( )
# while IFS=',' read -r Salsnr Salsnamn Lat Long Ort Hus Vaning Typ Storlek _ ; do

# if (( $count > 1 ))
# then
# cat <<EOF >> salar.json
#         {
#             "Salsnr": "$Salsnr",
#             "Salsnamn": "$Salsnamn",
#             "Lat": "$Lat",
#             "Long": "$Long",
#             "Ort":"$Ort",
#             "Hus": "$Hus",
#             "Våning": "$Vaning",
#             "Typ": "$Typ",
#             "Storlek": "$Storlek"
#         },
# EOF
# fi


# (( count += 1 ))
# done <salar.csv

# if     [ -n "$(tail -c1 salar.json)" ]    # if the file has not a trailing new line.
# then
#        truncate -s-1 salar.json           # remove one char as the question request.
# else
#        truncate -s-2 salar.json           # remove the last two characters
#        echo "" >> salar.json              # add the trailing new line back
# fi

# cat <<EOF >> salar.json
#     ]
# }
# EOF