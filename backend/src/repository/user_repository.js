const {collection, doc, getDocs, addDoc, deleteDoc, query, where, updateDoc} = require("firebase/firestore")

class UserRepository {
    constructor(firebaseBundle) {
        this._dbz = firebaseBundle.cloudFirestore
    }

    async getAllUsers() {
        const querySnapshot = await getDocs(collection(this._dbz, 'Users'))
        let jsonUserResult = {}
        querySnapshot.forEach(doc => {
            jsonUserResult[doc.id] = doc.data()
        });
        return jsonUserResult
    }

    async getUserByID(userID) {
        const querySnapshot = await getDocs(query(collection(this._dbz, 'Users'),
        where("__name__", "==", userID)))
        let jsonUserResult = {}
        querySnapshot.forEach(doc => {
            jsonUserResult[doc.id] = doc.data()
        });
        return jsonUserResult
    }

    async getUsersByType(userType) {
        const querySnapshot = await getDocs(query(collection(this._dbz, 'Users'),
        where("type", "==", userType)))
        let jsonUserResult = {}
        querySnapshot.forEach(doc => {
            jsonUserResult[doc.id] = doc.data()
        });
        return jsonUserResult
    }

    async createUser(user) {
        let newUser = await addDoc(
            collection(this._dbz, "Users"),
            user
        )
        return user.userID
    }

    async deleteUser(userID) {
        if (this._isLogQuery) console.log('Deleting User with userID: ' + userID)

        var response = "Success"
        await deleteDoc( 
            doc(collection(this._dbz, 'Users'), userID)
        )
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
            response = "Failed"
        });
        return response
    }

    async updateUser(userID, attributepair) {
        if (this._isLogQuery) console.log('Updating User with userID: ' + userID + " field: ligma " + attributepair)

        var response = "Success"
        console.log("attempting update in repo")
        const docRef = doc(this._dbz, 'Users', userID);
        return await updateDoc(docRef, attributepair);
}
}

module.exports = {
    UserRepository
}

/*const querySnapshot = await getDocs(query(collection(this._db, 'Trips'),
where("name", "==", tripID)))
let jsonResult = {}
querySnapshot.forEach(doc => {
jsonResult[doc.id] = doc.data()
});
return jsonResult*/