#! /usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${DIR}/build"
	npm install -g grunt-cli
	npm install
	grunt download-atom-shell
popd

#MacOS
"${DIR}/build/atom-shell/Atom.app/Contents/MacOS/Atom" "${DIR}/nerd-cal"

#Windows
#"${DIR}/build/atom-shell/Atom.app/Contents/MacOS/Atom" "${DIR}/hello-app"

#Linux
#"${DIR}/build/atom-shell/Atom.app/Contents/MacOS/Atom" "${DIR}/hello-app"
