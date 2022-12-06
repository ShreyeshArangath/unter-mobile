const express = require('express');
const { deleteUser } = require('firebase/auth');
const router = express.Router();

class UserController 
{

    constructor(userRepository)
    {
        this._userRepository = userRepository
    }
    
    async createUser(userData)
    {
        return await this._userRepository.createUser(userData);
    }

    async deleteUser(userID)
    {
        return await this._userRepository.deleteUser(userID);
    }

    async signInUser(un, pw)
    {
        return await this._userRepository.signInUser(un,pw);
    }

    async signOutUser()
    {
        return await this._userRepository.signOutUser();
    }

    async getUserByID(userID)
    {
        return await this._userRepository.getUserByID(userID);
    }

    async getUsersByType(userType)
    {
        return await this._userRepository.getUsersByType(userType);
    }

    async getAllUsers()
    {
        return await this._userRepository.getAllUsers();
    }


    async updateUser(userID, attributepair)
    {
        console.log("Controller attempting update")
        return await this._userRepository.updateUser(userID, attributepair)
    }


}
module.exports = {
    UserController
}