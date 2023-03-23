//@ts-check

/**
 * @typedef {object} Naughty_Opts
 * @property {number} Naughty_Opts.TTL
 * @property {number} Naughty_Opts.max_ip
 * @property {number} Naughty_Opts.max_id
 * @property {number} Naughty_Opts.autoclean_rate
 */

const Perishable_Counter = require('../perishable_counter')

/**
 * @type {Object<string, Naughty_Opts>}
 */
const defaults = {
    production: {
        TTL: 1000,
        max_ip: 10,
        max_id: 5,
        autoclean_rate: 1000
    },
    testing: {
        TTL: 1,
        max_ip: 3,
        max_id: 2,
        autoclean_rate: 0
    }
}

/**
 * Provides a way to deny a route to a request associated
 * with too many failures
 */
class Naughty {
    /**
     * Creates a new failed access blacklister
     * @param {Naughty_Opts} opts - override defaults
     */
    constructor(opts) {
        const def = defaults[process.env.NODE_ENV]
        let values = Object.assign({}, def, opts)
        this.TTL = values.TTL
        this.max_ip = values.max_ip
        this.max_id = values.max_id
        this.autoclean_rate = values.autoclean_rate
        this.ips = new Perishable_Counter(this.TTL, this.autoclean_rate)
        this.ids = new Perishable_Counter(this.TTL, this.autoclean_rate)
    }
    /**
     * Clear autocleaning timers. Very probably *do not* use
     * this in staging or production.
     */
    stop_autoclean() {
        this.ips.clear()
        this.ids.clear()
    }
    /**
     * Call this whenever access to a route fails
     * @param {string} ip - the ip of the request
     * @param {string} file_number - the user id associated
     * with the request
     */
    fail(ip, file_number) {
        this.ips.inc(ip)
        this.ids.inc(file_number)
    }
    /**
     * Check if an ip of user id have been blacklisted
     * @param {string} ip - the ip of the request
     * @param {string} file_number - the user id associated
     * with the request
     * @returns 
     */
    is_allowed(ip, file_number) {
        const { ips, ids, max_ip, max_id } = this
        const ip_count = ips.get(ip)
        const id_count = ids.get(file_number)
        return !(ip_count > max_ip || id_count > max_id)
    }
}

module.exports = Naughty