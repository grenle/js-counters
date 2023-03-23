function now_value() {
    return new Date().valueOf()
}

function promise_delay(ms){
    return new Promise((r) => setTimeout(r, ms))
}

module.exports = { now_value, promise_delay }