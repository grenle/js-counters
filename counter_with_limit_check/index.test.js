const Counter_With_Limit_Check = require('./index')
const { promise_delay } = require('../date_time')

test('inits', () => {
    const c = new Counter_With_Limit_Check(10, 0, 2)
    expect(c.get('foo')).toBe(0)
    expect(c.get('bar')).toBe(0)
})

test('inc\'s', () => {
    const c = new Counter_With_Limit_Check(10, 0, 2)
    const inc_vec = ['foo', 'bar', 'bar', 'bar']
    inc_vec.forEach(k => c.inc(k))
    expect(c.get('foo')).toBe(1)
    expect(c.get('bar')).toBe(3)
    expect(c.get('baz')).toBe(0)
})

test('check limit', () => {
    const c = new Counter_With_Limit_Check(10, 0, 2)
    const inc_vec = ['foo', 'bar', 'bar', 'bar']
    inc_vec.forEach(k => c.inc(k))
    expect(c.is_within_limits('foo')).toBe(true)
    expect(c.is_within_limits('bar')).toBe(false)
    expect(c.is_within_limits('baz')).toBe(true)
})