# Checksum

Checksum utility for node.

## Status

[![build status](https://secure.travis-ci.org/dshaw/checksum.png)](http://travis-ci.org/dshaw/checksum)

## Install

    npm install checksum

### Usage

    var checksum = require('checksum')
      , cs = checksum('dshaw')

    if (cs === '650a94547ad8ff00d5c5e3c8d54e8503d566b8ab0029dc289b5bb4294e39b92a') {
      console.log('yay')
    }

    checksum.file('dshaw.txt', function (err, sum) {
       if (sum === '650a94547ad8ff00d5c5e3c8d54e8503d566b8ab0029dc289b5bb4294e39b92a') {
         console.log('yay yay')
       }
    })

## Checksum cli tool

    npm install -g checksum

### Options

* `-a` `--algorithm`: default `sha256`
* `-v` `--verbose`: default `false`

### Usage

    $ echo -n dshaw | checksum
    > 650a94547ad8ff00d5c5e3c8d54e8503d566b8ab0029dc289b5bb4294e39b92a

    $ checksum ./*
    > dac3afc010e743f3e6e1ff063b47faf2862454df1d60e3eef1339817cfed39ad  ./History.md
    > 54ffa21d49426466813611c248867318add8d023c2834433aee831f3f1f1746b  ./Readme.md
    > 24a902990485588c18da6c965c6c19031995777593b92d28b23e7c0fa09011dd  ./checksum.js
    > b5c6c08d3b58b0057fe380b0fad07b6382c32b48280f16fdb4e9939d7f94d5f4  ./package.json

    $ checksum -a md5 ./test/*
    > 0255f3cb587ea090a6b39b5b864bdc95  ./test/checksum.test.js

    $ checksum -a sha1 ./bin/*
    > 7934b7927e562aa7f368430bf421b4a0aff27225  ./bin/checksum-cli.js
