const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');


const GetMongoClient = (uri) => {
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
}

module.exports = {
    GetMongoClient
}