const Perishable_Counter = require('./index')
const { promise_delay } = require('../date_time')

test('inits', () => {
    const c = new Perishable_Counter()
    c.inc('bar')
    expect(c.get('foo')).toBe(0)
    expect(c.get('bar')).toBe(1)
})

test('clean works', () => {
    const c = new Perishable_Counter(1, 0, () => 10)
    c.inc('foo')
    c.inc('foo')
    c.inc('bar')
    c.inc('bar')
    expect(c.get('foo')).toBe(2)
    expect(c.get('bar')).toBe(2)
    expect(c.last_modified['foo']).toBe(10)
    c.last_modified = { foo: 0, bar: 10 }
    c.clean()
    expect(c.get('foo')).toBe(0)
})

test('autoclean works', async () => {
    const c = new Perishable_Counter(1, 10)
    c.inc('foo')
    c.inc('foo')
    expect(c.get('foo')).toBe(2)
    const v = await promise_delay(10)
    expect(c.get('foo')).toBe(0)
    c.clear()
})
