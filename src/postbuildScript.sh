#!/usr/bin/env bash

ssiFile=src/comments.txt
indexFile=build/index.html
tempDirectory=tmp
tempFile=$tempDirectory/index.html

mkdir -p $tempDirectory

awk 'NR==FNR{rep=(NR>1?rep RS:"") $0; next} {gsub("<ssi/>",rep)}1' $ssiFile $indexFile > $tempFile && mv $tempFile $indexFile