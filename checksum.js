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

/**
 * Exports
 */

module.exports = checksum
checksum.file = checksumFile
checksum.stream = checksumStream

/**
 * Checksum
 */

function checksum (value, options) {
  options || (options = {})
  if (!options.algorithm) options.algorithm = 'sha1'

  var hash = crypto.createHash(options.algorithm)

  if (!hash.write) { // pre-streaming crypto API in node < v0.9

    hash.update(value)
    return hash.digest('hex')

  } else { // v0.9+ streaming crypto

    hash.setEncoding('hex')
    hash.end(value)
    return hash.read()

  }
}

/**
 * Checksum File
 */

function checksumFile (filename, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options || (options = {})
  if (!options.algorithm) options.algorithm = 'sha1'

  fs.stat(filename, function (err, stat) {
    if (!err && !stat.isFile()) err = new Error('Not a file')
    if (err) return callback(err)

    var fileStream = fs.createReadStream(filename)
    checksumStream(fileStream, options, callback);
  })
}

/**
 * Checksum Stream
 */

function checksumStream (stream, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options || (options = {})
  if (!options.algorithm) options.algorithm = 'sha1'

  var hash = crypto.createHash(options.algorithm)

  if (!hash.write) { // pre-streaming crypto API in node < v0.9

    stream.on('data', function (data) {
      hash.update(data)
    })

    stream.on('end', function () {
      callback(null, hash.digest('hex'))
    })

  } else { // v0.9+ streaming crypto

    hash.setEncoding('hex')
    stream.pipe(hash, { end: false })

    stream.on('end', function () {
      hash.end()
      callback(null, hash.read())
    })

  }
}
