const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const {collection, doc, getDocs, addDoc, deleteDoc, query, where, updateDoc, setDoc} = require("firebase/firestore")


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

    async createUser(userData) {
        console.log("Create user attempt backend")
        const auth = getAuth()
        var user
        var username = userData.username
        var password = userData.password
        return createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            user = userCredential.user.uid
            setDoc(doc(this._dbz, "Users", userCredential.user.uid), userData)
            console.log("returning user: ", user)
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    async signInUser(username, password) {
        const auth = getAuth()
        var user
        return signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            console.log("Signing in as " + userCredential.user.uid)
            user = userCredential.user.uid
            console.log("Signed in as user " + user)
            return user
        })
        .catch((error) => {
            const errorcode = error.code;
            const errormessage = error.message;
            return false;
        });
    }

    async signOutUser(){
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out")
        }).catch((error) => {
            // An error happened.
        });
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