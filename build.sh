#!/bin/bash

set -xeuo pipefail

# get env info
uname -a
ldd --version

# get commit log
git fetch --unshallow

# unpack objects for https://github.com/rwjblue/git-repo-info/issues/48
mv .git/objects/pack/pack-*.pack .
for pack in pack-*.pack; do
    git unpack-objects < "$pack"
done
rm pack-*.pack

# build
npx pnpm i --store=node_modules/.pnpm-store
npm run build
