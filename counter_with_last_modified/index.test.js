const Counter_With_Last_Modified = require('./index')

test('inits', () => {
    const c = new Counter_With_Last_Modified()
    expect(c.get('foo')).toBe(0)
})

test('default time function with valid date', () => {
    const c = new Counter_With_Last_Modified()
    c.inc('foo')
    expect(new Date(c.last_modified['foo'])).not.toBe(NaN)
})

test('time function is k for testing', () => {
    const c = new Counter_With_Last_Modified(() => 333)
    c.inc('foo')
    expect(c.last_modified['foo']).toBe(333)
})