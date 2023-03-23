//@ts-check

const default_trap = require('../default_trap')

/**
 * Returns an empty object that returns `value` for any
 * `get(k)` with k not in the object.
 * ```
 * > const o = new Object_With_Default('thedefault')
 * > o.foo = 3
 * > o['foo']
 * 3
 * > o['bar']
 * 'thedefault'
 * ```
 * @param {*} value 
 * @returns 
 */
function Object_With_Default(value) {
    return new Proxy({}, { get: default_trap(value) })
}

module.exports = Object_With_Default