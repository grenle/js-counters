//@ts-check

const Counter_With_Last_Modified = require('../counter_with_last_modified')

/**
 * A simple counting device for keys. Keys too old can be
 * [automatically] erased and will appear to have a count of
 * 0.
 * @extends Counter_With_Last_Modified
 */
class Perishable_Counter extends Counter_With_Last_Modified {
    /**
     * Create a Perishable_Counter. If the supplied rate is
     * non-zero, clean is called automatically.
     * @param {number} TTL - how many ms should the count
     * survive after last inc call.
     * @param {number} [rate] - refresh rate of the autoclean.
     * 0/undefined disables autoclean.
     * @param {() => number} [now_func] - an optional now
     * function, for testing mostly
     */
    constructor(TTL, rate, now_func) {
        super(now_func)
        this.TTL = TTL
        this.interval = null
        if(rate && !Number.isNaN(Number(rate))){
            this.interval = setInterval(() => this.clean(), rate)
        }
        this.clear = this.clear.bind(this)
    }
    clear(){
        clearInterval(this.interval)
    }
    /**
     * k/v pairs that are too old (date_modified + TTL <
     * now) are deleted
     */
    clean() {
        const now = this.now_func()
        for (const k in this.last_modified) {
            const limit = this.last_modified[k] + this.TTL
            if (limit < now) {
                delete this._data[k]
                delete this.last_modified[k]
            }
        }
    }
}

module.exports = Perishable_Counter