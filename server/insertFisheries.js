const { MongoClient } = require("mongodb");
require("dotenv").config();
const dbConnect = require("./dbConnect"); 
const fisheriesData = require("./fisheries.json"); 
let Models = require("./models");


async function insertFisheriesData() {
    try {
        // Connect to the MongoDB database
       // const db = await dbConnect.connect();

        // Insert the fisheries data into the database
        const result = await Models.Fishery.insertMany(fisheriesData);
        console.log("Fisheries data inserted:", result.length);

      
       // await dbConnect.close();
    } catch (err) {
        console.error("Error inserting fisheries data:", err);
    }
}


insertFisheriesData();
