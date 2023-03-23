//@ts-check

const Object_With_Default = require('../object_with_default')

/** A simple counting device for keys */
class Counter  {
    /**
     * Create a counter
     * ```
     * const  c = new Counter()
     * > c.inc('foo')
     * > c.inc('foo')
     * > c.inc('bar')
     * > c.get('foo')
     * 2
     * > c.get('bar')
     * 1
     * > c.get('baz')
     * 0
     * ```
     */
    constructor() {
        /**
         * @type {Object<string, number>}
         * @protected
         */
        this._data = Object_With_Default(0)
    }
    /**
     * Increase the count associated with `key`
     * @param {string} key 
     */
    inc(key) {
        this._data[key]++
    }
    /**
     * Return the counts of `key`. For keys that are not
     * properties, returns 0.
     * @param {string} key 
     */
    get(key) {
        return this._data[key]
    }
}

module.exports = Counter