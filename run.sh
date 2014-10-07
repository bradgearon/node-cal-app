#! /usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${DIR}/build"
	npm install -g grunt-cli
	npm install
	grunt download-atom-shell
popd

#MacOS
"./build/atom-shell/Atom.app/Contents/MacOS/Atom" "./nerd-cal"

#Windows
"./build/atom-shell/atom" "${DIR}/nerd-cal"

#Linux
./build/atom-shell/atom "${DIR}/nerd-cal"
