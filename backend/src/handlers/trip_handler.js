const express = require('express');

function getTripHandler(TripController) {
    const router = express.Router()
    
    /**
        * @api {get} api/trips/:tripID      Get the information about a particular trip  
        * @apiName GetTrip
        * @apiGroup Trip
        * @apiSuccess {data}                Get info with given tripID
    */
    router.get('/:tripID', async function(req, res, next) {
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

    /* */
    return router; 
}

module.exports = {
    getTripHandler
}