#!/bin/bash

filename="posts/$(date +%Y/%m)/$1.mdx"

[[ -f $filename ]] && echo "File [$filename] exists" && exit 1

mkdir -p "$(dirname "$filename")"
mkdir -p "src/images/$(date +%Y/%m)"

echo "---
title: $1
date: $(date -Iseconds)
image: 
tags:
-   
---



<Excerpt />

" > "$filename"

$EDITOR "$filename"
