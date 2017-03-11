var checksum = require('..')
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

// Passing encoding
test('checksum.base64', function (t) {
  t.equal(checksum('dshaw', { encoding: 'base64' }), 'm4zrwEISQdCH9qt+gVKFr4A95+c=', 'simple value')
  t.equal(checksum('1234567890~!@#$%^&*()_+', { encoding: 'base64' }), '1VMD0KGUMslonJ6/Uc7lH0U7k70=', 'more chars')
  t.end()
})

test('checksum.file.base64', function (t) {
  t.plan(3)
  checksum.file('./fixtures/dshaw.txt', { encoding: 'base64' }, function (err, sum) {
    t.equal(sum, 'm4zrwEISQdCH9qt+gVKFr4A95+c=', 'text file checksum')
  })
  checksum.file('./fixtures/1px.gif', { encoding: 'base64' }, function (err, sum) {
    t.equal(sum, 'xl7YN9RvkSKrBHwz0vnpR3hhh7Q=', 'binary file checksum')
  })
  checksum.file('./idontexist.text', { encoding: 'base64' }, function (err, sum) {
    t.equal(err.code, 'ENOENT', 'the stat error will be passed along')
  })
})
