//@ts-check

/**
 * ```
 * > console.log(default_trap('Dragons!')({}, 'foo'))
 * Dragons!
 * > console.log(default_trap('Dragons!')({foo: 'Foo here!'}, 'foo'))
 * Foo here!
 * > console.log(default_trap('Dragons!')({bar: 'Bar here!'}, 'foo'))
 * Dragons!
 * ```
 * @param {any} value 
 * @returns 
 */
function default_trap(value) {
    /**
     * 
     * @param {object} target 
     * @param {string} prop 
     * @param {object} receiver 
     * @returns 
     */
    function trap(target, prop, receiver) {
        if (!target.hasOwnProperty(prop)) {
            return value
        }
        return Reflect.get(target, prop, receiver)
    }
    return trap
}

module.exports = default_trap