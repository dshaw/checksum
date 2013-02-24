/*!
 * checksum
 * Copyright(c) 2013 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var crypto = require('crypto')

/**
 * Exports
 */

module.exports = checksum

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