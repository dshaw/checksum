var checksum = require('..')
  , tap = require('tap')
  , test = tap.test

tap.on('end', process.exit)

test('checksum', function (t) {
  t.equal(checksum('dshaw'), '650a94547ad8ff00d5c5e3c8d54e8503d566b8ab0029dc289b5bb4294e39b92a', 'simple value')
  t.equal(checksum('1234567890~!@#$%^&*()_+'), 'cbfd8eb072b509a43c8171f735864e09e7df0ebf538d8c756d27891069c78f47', 'more chars')
  t.end()
})

test('checksum.file', function (t) {
  t.plan(3)
  checksum.file('./fixtures/dshaw.txt', function (err, sum) {
    t.equal(sum, '650a94547ad8ff00d5c5e3c8d54e8503d566b8ab0029dc289b5bb4294e39b92a', 'text file checksum')
  })
  checksum.file('./fixtures/1px.gif', function (err, sum) {
    t.equal(sum, 'db7164038271366318dc041126f07aafe9bf671340966f4765948d0b07f6c5cc', 'binary file checksum')
  })
  checksum.file('./idontexist.text', function (err, sum) {
    t.equal(err.code, 'ENOENT', 'the stat error will be passed along')
  })
})

// Passing encoding
test('checksum.base64', function (t) {
  t.equal(checksum('dshaw', { encoding: 'base64' }), 'ZQqUVHrY/wDVxePI1U6FA9VmuKsAKdwom1u0KU45uSo=', 'simple value')
  t.equal(checksum('1234567890~!@#$%^&*()_+', { encoding: 'base64' }), 'y/2OsHK1CaQ8gXH3NYZOCeffDr9TjYx1bSeJEGnHj0c=', 'more chars')
  t.end()
})

test('checksum.file.base64', function (t) {
  t.plan(3)
  checksum.file('./fixtures/dshaw.txt', { encoding: 'base64' }, function (err, sum) {
    t.equal(sum, 'ZQqUVHrY/wDVxePI1U6FA9VmuKsAKdwom1u0KU45uSo=', 'binary file checksum')
  })
  checksum.file('./fixtures/1px.gif', { encoding: 'base64' }, function (err, sum) {
    t.equal(sum, '23FkA4JxNmMY3AQRJvB6r+m/ZxNAlm9HZZSNCwf2xcw=', 'text file checksum')
  })
  checksum.file('./idontexist.text', { encoding: 'base64' }, function (err, sum) {
    t.equal(err.code, 'ENOENT', 'the stat error will be passed along')
  })
})
