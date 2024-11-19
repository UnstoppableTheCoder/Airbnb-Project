const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews.length) {
    let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(res);
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

// Keep in mind -
// As soon as you create the model, the database gets created.
// You just need to export from here & import in app.js. That's it...

// The name of the collection will automatically be in Plural Form
// i.e. Listing --> listings
