const express = require('express');
const { deleteUser } = require('firebase/auth');
const router = express.Router();

class UserController 
{

    constructor(userRepository)
    {
        this._userRepository = userRepository
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

    async createUser(user)
    {
        return await this._userRepository.createUser(user);
    }

    async deleteUser(userID)
    {
        return await this._userRepository.deleteUser(userID);
    }

    async updateUser(userID, paramType, newValue)
    {
        console.log("Controller attempting update")
        return await this._userRepository.updateUser(userID, paramType, newValue)
    }


}
module.exports = {
    UserController
}