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

/**
 * Checksum
 */

function checksum (value, options) {
  options || (options = {})
  if (!options.algorithm) options.algorithm = 'sha256'
  if (!options.encoding) options.encoding = 'hex'

  var hash = crypto.createHash(options.algorithm)

  // http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
  if (!hash.write) { 
    // pre-streaming crypto API in node < v0.9
    hash.update(value)
    return hash.digest(options.encoding)

  } else {
    // v0.9+ streaming crypto
    // http://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
    hash.write(value)
    return hash.digest(options.encoding)

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
  if (!options.algorithm) options.algorithm = 'sha256'
  if (!options.encoding) options.encoding = 'hex'

  fs.stat(filename, function (err, stat) {
    if (!err && !stat.isFile()) err = new Error('Not a file')
    if (err) return callback(err)
    
    
    var hash = crypto.createHash(options.algorithm)
      , fileStream = fs.createReadStream(filename)

    if (!hash.write) { // pre-streaming crypto API in node < v0.9

      fileStream.on('data', function (data) {
        hash.update(data)
      })

      fileStream.on('end', function () {
        callback(null, hash.digest(options.encoding))
      })

    } else { // v0.9+ streaming crypto

      hash.setEncoding(options.encoding)
      fileStream.pipe(hash, { end: false })

      fileStream.on('end', function () {
        hash.end()
        callback(null, hash.read())
      })

    }
  })
}
