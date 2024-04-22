const { MongoClient } = require("mongodb");
const dbConnect = require("./server/dbConnect"); 
const fisheriesData = require("./server/fisheries.json"); 

async function insertFisheriesData() {
    try {
        // Connect to the MongoDB database
        const db = await dbConnect.connect();

        // Insert the fisheries data into the database
        const result = await db.collection("fisheries").insertOne(fisheriesData);
        console.log("Fisheries data inserted:", result.insertedCount);

      
        await dbConnect.close();
    } catch (err) {
        console.error("Error inserting fisheries data:", err);
    }
}


insertFisheriesData();
