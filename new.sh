#!/bin/bash

filename="posts/$(date +%Y/%m)/$1.mdx"

[[ -f $filename ]] && echo "File [$filename] exists" && exit 1

mkdir -p "$(dirname "$filename")"
mkdir -p "src/images/$(date +%Y/%m)"

echo "---
title: 
date: $(date -Iseconds)
image: 
description: 
tags:
-   
---



<Excerpt />

" > "$filename"

$EDITOR "$filename"
