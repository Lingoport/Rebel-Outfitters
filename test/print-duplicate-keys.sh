#!/bin/bash

lrm() {
    java -jar /var/lib/jenkins/lingoport/lrm-server-7.0/lrm-cli.jar "$@"
}

generate_report() {
    group="$1"
    project="$2"
    lrm -r -si -gn "$group" -pn "$project" 
}

process_report() {
    group="$1"
    project="$2"
    dest="$3"
    xmlstarlet sel -t -m 'LRMIssues/results/result' -v '@file' -o ',' -v '@reason' -o ',' -v '@lineNum' -nl  /var/lib/jenkins/Lingoport_Data/LRM/"$group"/reports/"$project"/ResourceIssues.xml  > "$dest"
}

get_issue_lines() {
    infile="$1"
    target_issue="$2"
    while read -r line ; do
        file="$(echo "$line" | cut -d ',' -f 1)"
        file=".$file"  # absolute to relative path -- ./abc/def
        issue="$(echo "$line" | cut -d ',' -f 2)"
        line="$(echo "$line" | cut -d ',' -f 3)"
        echo -n "$file: "
	sed -n "${line}p" "$file" | cut -d '=' -f 1
    done <<< "$(grep ",$target_issue" "$infile")"
}

usage() {
    echo "Usage:"
    echo "$0 <group> <project>"
}

if [[ "$#" -ne 2 ]] ; then
    usage
    exit 1
fi

group="$1"
project="$2"
WORKSPACE="/var/lib/jenkins/jobs/$group.$project/workspace"

if [[ ! -d "$WORKSPACE" ]] ; then
    echo "did not find workspace directory for $group.$project"
    echo "looking for: $WORKSPACE"
    echo "please double check input, and confirm that the WORKSPACE exists"
    exit 1
fi

#generate_report "$group" "$project"
process_report "$group" "$project" "$WORKSPACE/../issue-results.csv"
(
cd "$WORKSPACE"
get_issue_lines "$WORKSPACE/../issue-results.csv" "DUPLICATE_KEY"
)
