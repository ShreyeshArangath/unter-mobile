# Unter Backend Service 

## Local setup 
**Reach out to Shreyesh to get your hands on the secrets required for the app to run**  
Once you are in the root directory and you have added a .env file in the backend directory, follow the steps to get your server cracking. 

1. `cd backend`
2. To install the dependencies locally run `npm i`. 
3. Thats it! Run your server using the command `npm start`

## Guidelines 
- Always use dependency injection whenever you're constructing a new class. Examples of dependency injection can be found [here](https://github.com/ShreyeshArangath/unter/blob/main/server/internal/passenger/controller/controller.js#L2)
- Handler
    - Intercepts requests to the backend server
    - Maps external entities (JSON) to internal entities (classes)
    - Invokes controller specific operations on the internal entities 
    - Maps the internal resources back to external entities (JSON) and sends a response
- Controller 
    - Responsible for handling business logic operations 
    - If a business logic operation requires contact with the database, then it invokes repository-based functions
- Repository 
    - Maps internal entities to database-specific entities, if they exist 
    - Communicate with the database

## Resources 

- [Mongo DB Usage Examples]("https://www.mongodb.com/docs/drivers/node/current/usage-examples/")
- [Firebase Docs]("https://firebase.google.com/docs")