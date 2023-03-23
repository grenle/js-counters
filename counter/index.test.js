const Counter = require('./index')

test('inits', () => {
    const c = new Counter()
    expect(c.get('foo')).toBe(0)
})

test('inc / get work', () => {
    const c = new Counter()
    c.inc('foo')
    expect(c.get('foo')).toBe(1)
})

test('multi inc / get', () => {
    const  c = new Counter()
    c.inc('foo')
    c.inc('foo')
    c.inc('bar')
    expect(c.get('foo')).toBe(2)
    expect(c.get('bar')).toBe(1)
    expect(c.get('baz')).toBe(0)
})