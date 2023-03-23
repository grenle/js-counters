const Object_With_Default = require('./index')

test('default on {}', () => {
    const o = new Object_With_Default('thedefault')
    expect(o['foo']).toEqual('thedefault')
})

test('3 on {foo: 3}', () => {
    const o = new Object_With_Default('thedefault')
    o.foo = 3
    expect(o['foo']).toEqual(3)
    expect(o['bar']).toEqual('thedefault')
})
