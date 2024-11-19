const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

// Connecting to MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => {
    return { ...obj, owner: "67271d26c6e5c8eceb90f74b" };
  });
  await Listing.insertMany(initData.data);
  console.log("Data was initialized!");
};

initDB();
