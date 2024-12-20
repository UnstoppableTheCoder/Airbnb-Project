const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.rediectUrl = req.originalUrl; // When we ask the use to login while using the website.
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

// Passport automatically removes the info of the sessions when we get a successful login...
// that's why the value of req.session.redirectUrl is going to be undefined by the time we need to use it...
// So, let's create a middleware & save it in res.locals so that we can access it later.

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.rediectUrl) {
    res.locals.redirectUrl = req.session.rediectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!req.user._id.equals(listing.owner._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log("review - ", review);
  if (!req.user._id.equals(review.author)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
