var checksum = require('..')
  , tap = require('tap')
  , test = tap.test

tap.on('end', process.exit)

test('checksum', function (t) {
  t.equal(checksum('dshaw'), '9b8cebc0421241d087f6ab7e815285af803de7e7', 'simple value')
  t.equal(checksum('1234567890~!@#$%^&*()_+'), 'd55303d0a19432c9689c9ebf51cee51f453b93bd', 'more chars')
  t.end()
})