class UserRepository {
    constructor(firebaseBundle) {
        this._firebaseBundle = firebaseBundle
    }

    async getUsers() {}

    async getUserWithID(userID) {}

    async createUser(User) {}

    async updateUserRating(userID, newRating) {}

    async deleteUser(userID) {}
}

module.exports = {
    UserRepository
}