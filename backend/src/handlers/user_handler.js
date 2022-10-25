const express = require("express");

function getUserHandler(UserController)
{
    const router = express.Router();

/* =============================   Trips Get Info   =============================*/

    /** 
        * @api {get} api/users/id/:userID      Get the information about a particular trip
        * @apiName GetUserByID
        * @apiGroup users
        * @param userID                  kill me
        * @apiSuccess {data}                Get info with given userID   
     */
    router.get('/id/:userID', async function(req, res, next) {
        try {
            const userID = req.params.userID
            if (userID){

                const data = await UserController.getUserByID(userID)
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

    /*
        * @api {get} api/users/id/ligma/balls :userID      Get the information about a particular trip
        * @apiName GetAllUsers
        * @apiGroup users
        * @param none                 kill me
        * @apiSuccess {data}                Get info with given userID   
     */

    router.get('/all', async function(req, res, next) {
        try {
            const userID = req.params.userID
            if (true){

                const data = await UserController.getAllUsers()
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

    router.get('/type/:userType', async function(req, res, next) {
        try {
            const userID = req.params.userType
            if (userType){

                const data = await UserController.getUsersByType()
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

    router.post('/create', async function(req, res, next) {
        try {  
            const user = req.body
            if (true){

                const data = await UserController.createUser(user)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while creating user: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    router.delete('/delete/:userID', async function(req, res, next) {
        try {
            const userID = req.params.userID
            if (userID){

                const data = await UserController.deleteUser(userID)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while deleting user: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    router.get('/update/:userID&:paramType&:newValue', async function(req, res, next) {
        try {
            const userID = req.params.userID
            const paramType = req.params.paramType
            const newValue = req.params.newValue
            console.log("Attempting routing in handler")
            if (userID){

                const data = await UserController.updateUser(userID, paramType, newValue)
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while updating user: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    router.put('/manipulate/:tripID', async function(req, res, next) {
        try {
            const tripID = req.params.tripID
            const attr = req.body

            is_valid_attr = true
            Object.keys(myObject).forEach(attribute => {
                if (is_valid_attr) is_valid_attr = DEFAULT_TRIP.hasOwnProperty(attribute)
                if (is_valid_attr) is_valid_attr = typeof(DEFAULT_TRIP.attribute) == typeof(attribute)
            });

            if (tripID && attr && is_valid_attr){
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

    return router; 

}



module.exports = {
    getUserHandler
}