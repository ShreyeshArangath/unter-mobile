const express = require('express');
const { TRIP_STATUS, RATING_BOUNDS, DEFAULT_TRIP} = require('../shared/definitions')

function getTripHandler(TripController) {
    const router = express.Router()

    /* =============================   Trips Get Info   =============================*/
    
    /** 
        * @api {get} api/trips/id/:tripID      Get the information about a particular trip  
        * @apiName GetTripByID
        * @apiGroup Trip
        * @param tripID                     The tripID
        * @apiSuccess {data}                Get info with given tripID
    */
    router.get('/id/:tripID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            if (tripID){
                const data = await TripController.getTripById(tripID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while retrieving trip: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {get} api/trips/all             Get all trips
        * @apiName GetAllTrips
        * @apiGroup Trip
        * @apiSuccess {data}                All trips
    */
    router.get('/all', async function(req, res, next) {
        try {
            const data = await TripController.getAllTrips()
            res.json(data)

        }catch(err) {
            const errMessage = "Error while retrieving trips: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {get} api/trips/driver/:driverID       Get all trips with driverID
        * @apiName GetTripsWithDriver
        * @apiGroup Trip
        * @apiSuccess {data}                          Trip list data
    */
    router.get('/driver/:driverID', async function(req, res, next) {
        try {
            const driverID = req.params.driverID
            if (driverID){
                const data = await TripController.getTripWithDriver(driverID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while retrieving trips: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {get} api/trips/passenger/:passengerID       Get all trips with passengerID
        * @apiName GetTripsWithPassenger
        * @apiGroup Trip
        * @apiSuccess {data}                                Trip list data
    */
    router.get('/passenger/:passengerID', async function(req, res, next) {
        try {
            const passengerID = req.params.passengerID
            if (passengerID){
                const data = await TripController.getTripWithPassenger(passengerID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while retrieving trips: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /* =============================   Trip Progress Manipulation   =============================*/

    /**
        * @api {get} api/trips/ride/next             Get next trip info of oldest trip in queue
        * @apiName GetNextTrip
        * @apiGroup Trip
        * @apiSuccess {data}                         Gets data of the next trip in queue
    */
    router.get('/ride/next', async function(req, res, next) {
        try {
            const data = await TripController.getNextTrip()
            res.json(data)
        }catch(err) {
            const errMessage = "Error while retrieving trips: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {post} api/trips/ride/start/           Start a trip with passenger
        * @apiName StartTrip
        * @apiGroup Trip
        * @apiBody  {passengerID: x, latitude: x, longitude: y}                             GeoLocation of the start trip in JSON format 
        * The latitude of this GeoPoint in the range [-90, 90].
        * The longitude of this GeoPoint in the range [-180, 180].
        * @apiSuccess {data}                                tripID
    */
    router.post('/ride/start', async function(req, res, next) {
        try {
            const startingTripInfo = req.body
        
            if ( 
                startingTripInfo.hasOwnProperty('passengerID') && startingTripInfo.passengerID &&
                startingTripInfo.hasOwnProperty('latitude') && startingTripInfo.hasOwnProperty('longitude') &&
                startingTripInfo.latitude >= -90 && startingTripInfo.latitude <= 90 &&
                startingTripInfo.longitude >= -180 && startingTripInfo.longitude <= 180
            ){
                const data = await TripController.createTrip(startingTripInfo)//replace this body geo location
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while starting trip: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {put} api/trips/ride/set_driver/:tripID&:driverID             Sets the trip with a driver and updated its status
        * @apiName SetTripDriver
        * @apiGroup Trip
        * @apiSuccess {data}                                                Returns whether this op was successful
    */
    router.put('/ride/set_driver/:tripID&:driverID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            const driverID = req.params.driverID
            if (driverID && tripID){
                const data = await TripController.setDriverTrip(tripID, driverID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while setting trip driver: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {put} api/trips/ride/update_status/:tripID&:status                    Rates the Driver performance for the trip
        * @apiName RateDriverPerformance
        * @apiGroup Trip
        * @apiSuccess {data}                                                Returns weather this op was successful
    */
    router.put('/ride/update_status/:tripID&:status', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            const status = req.params.status

            if (tripID && status && TRIP_STATUS.hasOwnProperty(status)) {
                const data = await TripController.updateTripStatus(tripID, status)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while updating the trips status: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {put} api/trips/ride/end/:tripID                             Ends the Trip
        * @apiName EndTrip
        * @apiGroup Trip
        * @apiSuccess {data}                                                Returns weather this op was successful
    */
    router.put('/ride/end/:tripID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID

            if ( tripID ) {
                const data = await TripController.updateTripStatus(tripID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while Ending Trip: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {put} api/trips/ride/rate/driver/:tripID                     Rates the Driver performance for the trip
        * @apiName RateDriverPerformance
        * @apiGroup Trip
        * @apiSuccess {data}                                                Returns weather this op was successful
    */
    router.put('/ride/rate/driver/:tripID&:rating', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            const rating = req.params.rating

            if (tripID && rating && rating >= RATING_BOUNDS.lower_bound && rating <= RATING_BOUNDS.upper_bound ) {
                const data = await TripController.setTripDriverRating(tripID, rating)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while setting the Driver rating: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

        /**
        * @api {put} api/trips/ride/rate/passenger/:tripID                  Rates the Passenger performance for the trip
        * @apiName RateDriverPerformance
        * @apiGroup Trip
        * @apiSuccess {data}                                                Returns weather this op was successful
    */
         router.put('/ride/rate/passenger/:tripID&:rating', async function(req, res, next) {
            try {
                const tripID = req.params.tripID
                const rating = req.params.rating
    
                if (tripID && rating && rating >= RATING_BOUNDS.lower_bound && rating <= RATING_BOUNDS.upper_bound ) {
                    const data = await TripController.setTripPassengerRating(tripID, rating)
                    res.json(data)
                } else {
                    res.status(400)
                    res.send("Check request parameters/body")
                }
            }catch(err) {
                const errMessage = "Error while setting the Passenger rating: " + err.message
                res.status(404)
                res.send(errMessage)
                next(err);
            }
        })

    /* =============================   Trip Admin Manipulation   =============================*/

    /**
        * @api {delete} api/trips/delete/:tripID           Delete a trip with tripID
        * @apiName DeleteTrip
        * @apiGroup Trip
        * @apiSuccess {data}                               Success/Failure
    */
    router.delete('/delete/:tripID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            if (tripID){
                const data = await TripController.deleteTrip(tripID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while deleting trip: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
        * @api {delete} api/trips/delete/:tripID           Delete a trip with tripID
        * @apiName DeleteTrip
        * @apiGroup Trip
        * @apiSuccess {data}                               Success/Failure
    */
    router.put('/manipulate/:tripID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            const attr = req.body
            is_valid_attr = true
            Object.keys(attr).forEach(attribute => {
                if (is_valid_attr) is_valid_attr = DEFAULT_TRIP.hasOwnProperty(attribute)
            });
            
            console.log(is_valid_attr);
            if (tripID && attr && is_valid_attr){
                const data = await TripController.setUltimateAttr(tripID, attr)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while Manipulating trip: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /* */
    return router; 
}

module.exports = {
    getTripHandler
}