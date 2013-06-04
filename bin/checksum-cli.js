#!/usr/bin/env node
/*!
 * checksum
 * Copyright(c) 2013 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var crypto = require('crypto')
  , fs = require('fs')
  , optimist = require('optimist')

/**
 * Configuration
 */

var options = optimist
      .boolean(['verbose'])
      .alias('a', 'algorithm')
      .alias('v', 'verbose')
      .default('algorithm', 'sha1')
      .default('verbose', false)
      .argv
  , fileCount = options._.length

/**
 * Checksum CLI
 */

if (fileCount) { // handle files

  nextFile(options._[0], 0)

} else { // handle stdin

  var hash = crypto.createHash(options.algorithm)
  if (!hash.write) { // pre-streaming crypto API in node < v0.9
    process.stdin.on('data', function (data) {
      hash.update(data)
    })
    process.stdin.on('end', function () {
      process.stdout.write(hash.digest('hex'))
    })
    process.stdin.resume()
  } else { // v0.9+ streaming crypto
    hash.setEncoding('hex')
    process.stdin.pipe(hash).pipe(process.stdout)
  }

}

/**
 * Next File
 * @param filename
 * @param count
 */

function nextFile (filename, count) {
  fs.stat(filename, function (err, stat) {
    if (err || !stat.isFile()) {
      if (options.verbose) {
        if (err) console.log('error:', err && err.message)
        else if (!stat.isFile()) console.log('info:', 'not a file', filename)
      }
      if (++count !== fileCount) {
        nextFile(options._[count], count)
      }
      return
    }

    var hash = crypto.createHash(options.algorithm)
      , fileStream = fs.createReadStream(filename)

    if (!hash.write) { // pre-streaming crypto API in node < v0.9

      fileStream.on('data', function (data) {
        hash.update(data)
      })

      fileStream.on('end', function () {
        process.stdout.write(hash.digest('hex') + '  ' + filename + '\n')
        if (++count !== fileCount) {
          nextFile(options._[count], count)
        }
      })

    } else { // v0.9+ streaming crypto

      hash.setEncoding('hex')
      fileStream.pipe(hash, { end: false })

      fileStream.on('end', function () {
        hash.end()
        process.stdout.write(hash.read() + '  ' + filename + '\n')
        if (++count !== fileCount) {
          nextFile(options._[count], count)
        }
      })

    }
  })
}
