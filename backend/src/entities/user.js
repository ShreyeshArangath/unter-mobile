class User {

    user(type, fName, lName, dob, username, rating)
    {
        this.type = type;
        this.fName = fName;
        this.lName = lName;
        this.dob = dob;
        this.username = username;
        this.rating = rating;
    }

    //user methods
    authenticateUser(un,pw) //reworking to database call.
    {
        //get user from database
        //this.fName = pulledfName;
        //this.lName = pulledlName;
        //this.userID = pulledID;
    }

    async getTripDetails(tripID)
    {
        return await TripController.getTripById(tripID);
    }
    


}
