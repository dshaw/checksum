var checksum = require('..')
  , fs = require('fs')
  , tap = require('tap')
  , test = tap.test

tap.on('end', process.exit)

test('checksum', function (t) {
  t.equal(checksum('dshaw'), '9b8cebc0421241d087f6ab7e815285af803de7e7', 'simple value')
  t.equal(checksum('1234567890~!@#$%^&*()_+'), 'd55303d0a19432c9689c9ebf51cee51f453b93bd', 'more chars')
  t.end()
})

test('checksum.file', function (t) {
  t.plan(3)
  checksum.file('./fixtures/dshaw.txt', function (err, sum) {
    t.equal(sum, '9b8cebc0421241d087f6ab7e815285af803de7e7', 'text file checksum')
  })
  checksum.file('./fixtures/1px.gif', function (err, sum) {
    t.equal(sum, 'c65ed837d46f9122ab047c33d2f9e947786187b4', 'binary file checksum')
  })
  checksum.file('./idontexist.text', function (err, sum) {
    t.equal(err.code, 'ENOENT', 'the stat error will be passed along')
  })
})

test('checksum.stream', function (t) {
  t.plan(2)
  var fileStream1 = fs.createReadStream('./fixtures/dshaw.txt')
  checksum.stream(fileStream1, function (err, sum) {
    t.equal(sum, '9b8cebc0421241d087f6ab7e815285af803de7e7', 'text file stream checksum')
  })
  var fileStream2 = fs.createReadStream('./fixtures/1px.gif')
  checksum.stream(fileStream2, function (err, sum) {
    t.equal(sum, 'c65ed837d46f9122ab047c33d2f9e947786187b4', 'binary file stream checksum')
  })
})
