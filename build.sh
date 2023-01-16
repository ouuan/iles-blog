#!/bin/bash

set -xeuo pipefail

# get env info
uname -a
ldd --version

# get commit log
if [[ $(git rev-parse --is-shallow-repository) == "true" ]]; then
    git fetch --unshallow
fi

# unpack objects for https://github.com/rwjblue/git-repo-info/issues/48
mv .git/objects/pack/pack-*.pack .
for pack in pack-*.pack; do
    git unpack-objects < "$pack"
done
rm -f pack-*.pack

# build
npx pnpm i --store=node_modules/.pnpm-store
npm run build
