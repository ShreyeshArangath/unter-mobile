import { useState } from 'react';


//put the incoming json into a good format, and storing in user class
export function serverResponse(incomingJSON, userClass)
{
    //remove whitespace
    incomingJSON = incomingJSON.replace(/\s/g,"");
    let id, data;
    
    //get the UUID of the first object that we are using, 
    //only valid if we are only getting one object
    id = incomingJSON.substring(incomingJSON.indexOf("\"")+1);
    id = id.substring(0, id.indexOf(':')-1);
    //put the rest of the data into a seperate string
    data = incomingJSON.substring(incomingJSON.indexOf(':')+1, incomingJSON.lastIndexOf("}"));

    //store the items in the user object for future reference
    userClass.idModifyer(id);
    userClass.dataModifyer(data);
}


export class UsersClass
{
    constructor(type)
    {
        //store the type of the object as string(ex. admin, driver, passenger)
        this.type = type;

        //make these to allow us to modify values inside of react style code
        const [UIMode, UIModeModifyer] = useState("Start Screen");
        const [id, idModifyer] = useState("");
        const [data, dataModifyer] = useState("");

        this.id = id;
        this.idModifyer = idModifyer;

        this.data = data;
        this.dataModifyer = dataModifyer;

        this.UIMode = UIMode;
        this.UIModeModifyer = UIModeModifyer;
    }

    //return the data as a parsed json object, with the variable names of the json to 
    //names in the object, to retrieve data
    getData(){
        return JSON.parse(this.data);
    }
}

//example data from the server for front end reference and to use if you do not want 
//to keep calling to the server
export let TripExampleData = '{\
    "N8N0Qce1TGKoPsLAcvAa": {\
    "passID": "stupid",\
    "startTime": {\
        "seconds": 1664946000,\
        "nanoseconds": 705000000\
    },\
    "driverID": "stupido",\
    "startLoc": {\
        "latitude": 0,\
        "longitude": 0\
    },\
    "driverRating": -1,\
    "status": "in_queue",\
    "endLoc": {\
        "latitude": 0,\
        "longitude": 0\
    },\
    "passRating": -1,\
    "endTime": {\
        "seconds": 1664946000,\
        "nanoseconds": 919000000\
    }\
    }\
}'
