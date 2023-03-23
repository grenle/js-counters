const default_trap = require('./index')

test('inits properly', () => {
    const deftrap = default_trap('Dragons!')
    const value = deftrap({}, 'foo')
    expect(value).toEqual('Dragons!')
})

test('Returns existing property', () => {
    const deftrap = default_trap('Dragons!')
    const value = deftrap({ foo: 'Foo here!' }, 'foo')
    expect(value).toEqual('Foo here!')
})

test('Default even with other k in o', () => {
    const deftrap = default_trap('Dragons!')
    const value = deftrap({ bar: 'Bar here!' }, 'foo')
    expect(value).toEqual('Dragons!')
})