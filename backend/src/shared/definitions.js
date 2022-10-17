
/** All Possible States Within A Trip (changing strings might break old trips)*/
const TRIP_STATUS = Object.freeze({
    in_queue : "in_queue",
    to_pass : "to_pass",
    wait_pass : "wait_pass",
    on_delivery : "on_delivery",
    completed : "completed",
    pass_cancel : "pass_cancel",
    driver_cancel : "driver_cancel"
})

/** Bounds of Rating*/
const RATING_BOUNDS = Object.freeze({
    upper_bound : 5,
    lower_bound : 0
})

/** Trip with attributes set to correct type */
const DEFAULT_TRIP = Object.freeze({
    'driverID' : 'null',
    'driverRating' : -1,
    'endLoc' : [0,0],
    'endTime' : new Date().toLocaleString(),
    'passID' : 'null',
    'passRating' : -1,
    'startLoc' : [0,0],
    'startTime' : new Date().toLocaleString(),
    'status' : 'null'
})

module.exports = {
    TRIP_STATUS,
    RATING_BOUNDS,
    DEFAULT_TRIP
}