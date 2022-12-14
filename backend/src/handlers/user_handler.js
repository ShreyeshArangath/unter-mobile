const express = require("express");

function getUserHandler(UserController)
{
    const router = express.Router();

/* =============================   Trips Get Info   =============================*/

    /** 
        * @api {get} api/users/id/:userID      Get the information about a particular trip
        * @apiName GetUserByID
        * @apiGroup users
        * @param userID                  
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
        console.log("Attempting routing")
        try {  
            const userData = req.body
            const data = await UserController.createUser(userData)
            res.send(data)
        }catch(err) {
            const errMessage = "Error while creating user: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    router.get('/signin/:username/:password', async function(req, res, next) {
        console.log("Sign in attempting routing")
        try {  
            const username = req.params["username"]
            const password = req.params["password"]
            if (true){

                const data = await UserController.signInUser(username, password)
                res.send(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while signing in: " + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    router.get('/signout', async function(req, res, next) {
        try {  
            if (true){

                const data = await UserController.signOutUser()
                res.json(data)
            } else {
                res.status(400)
                res.send("Check request parameters/body")
            }
        }catch(err) {
            const errMessage = "Error while signing out?: " + err.message
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

    router.put('/update/:userID', async function(req, res, next) {
        try {
            const userID = req.params.userID
            const attributepair = req.body
            console.log("Attempting routing in handler")
            if (userID){

                const data = await UserController.updateUser(userID, attributepair)
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

    return router; 

}



module.exports = {
    getUserHandler
}