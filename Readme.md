# Checksum

Checksum utility for node.

## Install

    npm install checksum

### Usage

    var checksum = require('checksum')
      , cs = checksum('dshaw')

    if (cs === '9b8cebc0421241d087f6ab7e815285af803de7e7') {
      console.log('yay')
    }

    checksum.file('dshaw.txt', function (err, sum) {
       if (cs === '9b8cebc0421241d087f6ab7e815285af803de7e7') {
         console.log('yay yay')
       }
    })

## Checksum cli tool

    npm install -g checksum

### Options

* `-a` `--algorithm`: default `sha1`
* `-v` `--verbose`: default `false`

### Usage

    $ echo -n dshaw | checksum
    > 9b8cebc0421241d087f6ab7e815285af803de7e7

    $ checksum ./*
    > c86d703371777a96ef7cdbb6a8fe65afb8e95d94  ./History.md
    > 6d8afb5a7e0bf476e966a9b741057ba712ba067a  ./Readme.md
    > 09f5ad81b312fe59619fbfbfd5b3785deb9b0e88  ./checksum.js
    > 47396881ce59853d53766ad701c13b0a107a8d6c  ./package.json

    $ checksum -a md5 ./test/*
    > e54ea1240678c34901b150609e9b1906  ./test/checksum.test.js

    $ checksum -a sha256 ./bin/*
    > f1e3209ff36988ffb136414d4d582052d901d0f3019c3d133731bcd751761c23  ./bin/checksum-cli.js