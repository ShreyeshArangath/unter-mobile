const express = require('express');
const router = express.Router();

class TripController {
    constructor(tripRepository){
        this._tripRepo = tripRepository
    }

    async getTripById(tripID){
        return await this._tripRepo.getTrip(tripID);
    }


}
module.exports = {
    TripController
}