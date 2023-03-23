//@ts-check

const Counter = require('../counter')
const { now_value } = require('../date_time')

/**
 * A simple counting device for keys. Also remembers last
 * time a key was updated.
 * @extends Counter
 */
class Counter_With_Last_Modified extends Counter {
    /**
     * A nullary function returning a number representing
     * the 'now' timestamp. Mostly here to help with
     * testing, default works fine.
     * @param {() => number} now_func 
     */
    constructor(now_func = now_value) {
        super()
        this.now_func = now_func
        this.last_modified = {}
    }
    /**
     * Increase the count associated with `key`
     * @param {string} key 
     */
    inc(key) {
        this.last_modified[key] = this.now_func()
        super.inc(key)
    }
}

module.exports = Counter_With_Last_Modified