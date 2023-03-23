const { promise_delay } = require('../date_time')
const Naughty = require('./index')

/**
 * You can copy this as a template
 */
test('inits', () => {
    const n = new Naughty()
    // insert `n` method and `expect` calls here
    n.stop_autoclean()
})

test('check before fail', () => {
    const n = new Naughty()
    expect(n.is_allowed('ip_0', 'fn_0')).toBe(true)
    n.stop_autoclean()
})

test('too many ips', () => {
    const n = new Naughty()
    n.fail('ip_0', 'fn_0')
    n.fail('ip_0', 'fn_1')
    n.fail('ip_0', 'fn_2')
    n.fail('ip_0', 'fn_3')
    expect(n.is_allowed('ip_0', 'fn_0')).toBe(false)
    expect(n.is_allowed('ip_0', 'fn_1')).toBe(false)
    n.stop_autoclean()
})

test('too many file_number\'s', () => {
    const n = new Naughty()
    n.fail('ip_0', 'fn_0')
    n.fail('ip_1', 'fn_0')
    n.fail('ip_2', 'fn_0')
    expect(n.is_allowed('ip_0', 'fn_0')).toBe(false)
    expect(n.is_allowed('ip_1', 'fn_0')).toBe(false)
    n.stop_autoclean()
})

test('autoclean', async () => {
    const n = new Naughty({autoclean_rate: 20})
    n.fail('ip_0', 'fn_0')
    n.fail('ip_0', 'fn_0')
    n.fail('ip_0', 'fn_0')
    expect(n.is_allowed('ip_0', 'fn_0')).toBe(false)
    const v = await promise_delay(40)
    expect(n.is_allowed('ip_0', 'fn_0')).toBe(true)
    n.stop_autoclean()
})
