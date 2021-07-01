# Waste Management

## This website provides an implementation of Prim's algorithm in a graphical method <br />

You can throw the garbage in any area. <br/>
Whenever in a dustbin, the garbage capacity will be more than 70%, the program will include that area in the map. <br/>
The program can then generate a route with all the areas covered in minimum possible distance. <br/>
This will result in saving of time and money by avoiding unnecessary visit to all the dustbins <br/><br/>

# To run the application locally

## Requirements

1. GitBash installed
2. Any web browser

## Steps

1. Open GitBash and write
   > git clone https://github.com/vikash452/OnlineCompiler.git
2. Once the the cloning is done, open the directory and make .env file
3. In the env file you have to paste the link of MongoDB database. You can save the data locally.
4. Paste this
   > MONGO_URL=mongodb://localhost:27017/DST
5. In the next two lines paste:
   > USER_ID = <--any user id of your choice-->
   > PASSWORD = <--any password of your choice-->  
   > and make the necessary changes
6. Once done, save the env file and run the server by typing
   > nodemon server.js
   > on GitBash (make sure you are in the same directory where you cloned the project)
7. Now open your web browser and type
   > localhost:5000
8. Now go to the add dustbin and then you can add ten dustbins with the names as specified in the code (in throw_garbage.html).

## Now it is ready to be used
