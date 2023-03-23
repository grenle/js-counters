//@ts-check

/**
 * @typedef {object} Opts
 * @property {number} Opts.TTL
 * @property {number} Opts.autoclean_rate
 * @property {number} limit
 */

const Perishable_Counter = require('../perishable_counter')

/**
* Provides a counter that can check(key) for an associated
* value larger than established class-wide limit. 
*/
class Counter_With_Limit_Check extends Perishable_Counter {
    /**
     * Creates a new failed access blacklister
     * @param {number} TTL
     * @param {number} autoclean_rate
     * @param {number} limit
     */
    constructor(TTL, autoclean_rate, limit) {
        super(TTL, autoclean_rate)
        this.limit = limit
    }
    is_excessive(k){
        return this.get(k) > this.limit
    }
    /**
     * Is the value associated with k no larger than /
     * inferior or equal to the class-wide limit
     * @param {string} k 
     * @returns 
     */
    is_within_limits(k) {
        return !(this.get(k) > this.limit)
    }
}

module.exports = Counter_With_Limit_Check