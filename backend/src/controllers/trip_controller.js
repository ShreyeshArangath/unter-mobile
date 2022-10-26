const express = require('express');
const router = express.Router();
const {GeoPoint} = require("firebase/firestore")
const { TRIP_STATUS } = require('../shared/definitions')

class TripController {
    constructor(tripRepository){
        this._tripRepo = tripRepository
    }

    async getTripById(tripID){
        return await this._tripRepo.getTrip(tripID);
    }

    async getAllTrips(){
        return await this._tripRepo.getAllTrips();
    }

    async getTripWithDriver(driverID){
        return await this._tripRepo.getTripsWithDriverID(driverID);
    }

    async getTripWithPassenger(passID){
        return await this._tripRepo.getTripsWithPassengerID(passID);
    }

    async getNextTrip(){ 
        var result = 'No Trips in Queue, please try again later'
        const trip_info = await this._tripRepo.getNextTrip(TRIP_STATUS.in_queue)
        if (trip_info) {
            result = trip_info
        }
        return result
    }

    async createTrip(passID, startLocation){
        const DEFAULT_TRIP_START = {
            'driverID' : 'NULL',
            'driverRating' : -1,
            'endLoc' : new GeoPoint(startLocation.latitude, startLocation.longitude), // change to an address?
            'endTime' : 0,
            'passID' : passID,
            'passRating' : -1,
            'startLoc' : new GeoPoint(startLocation.latitude, startLocation.longitude), // change to an address?
            'startTime' : new Date().toLocaleString(),
            'status' : TRIP_STATUS.in_queue
        }
        var newTripID = await this._tripRepo.createTrip(passID, DEFAULT_TRIP_START);
        return newTripID
    }

    async setDriverTrip(tripID, driverID){ 
        return await this._tripRepo.setTripDriver(tripID, driverID, TRIP_STATUS.to_pass)
    }

    async updateTripStatus(tripID, new_status){ 
        return await this._tripRepo.updateTripStatus(tripID, new_status)
    }

    async endTrip(tripID, endLocation){  

        const att_updating = {
            'endLoc' : endLocation,
            'endTime' : new Date().toLocaleString(),
            'status' : 'completed'
        }
        return await this._tripRepo.endTrip(tripID, att_updating)
    }

    async setTripDriverRating(tripID, rating){ 
        return await this._tripRepo.setTripDriverRating(tripID, rating)
    }

    async setTripPassengerRating(tripID, rating){ 
        return await this._tripRepo.setTripPassengerRating(tripID, rating)
    }

    async deleteTrip(tripID){
        return await this._tripRepo.deleteTrip(tripID);
    }

    async setUltimateAttr(tripID, attr){ 
        return await this._tripRepo.setUltimateAttr(tripID, attr)
    }



}
module.exports = {
    TripController
}