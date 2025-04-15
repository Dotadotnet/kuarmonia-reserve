const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

const error = require("./middleware/error.middleware");

const app = express();

/* allowed origins */
const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL,
  process.env.NEXT_PUBLIC_DASHBOARD_URL
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  })
);

app.use("/api/currency", require("./routes/currency.route"));
app.use("/api/tag", require("./routes/tag.route"));
app.use("/api/category", require("./routes/category.route"));
app.use("/api/socialLink", require("./routes/socialLink.route"));
app.use("/api/product", require("./routes/product.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/cart", require("./routes/cart.route"));
app.use("/api/favorite", require("./routes/favorite.route"));
app.use("/api/review", require("./routes/review.route"));
app.use("/api/payment", require("./routes/payment.route"));
app.use("/api/purchase", require("./routes/purchase.route"));
app.use("/api/post", require("./routes/post.route"));
app.use("/api/property", require("./routes/property.route"));
app.use("/api/tradeType", require("./routes/tradeType.route"));
app.use("/api/saleType", require("./routes/saleType.route"));
app.use("/api/propType", require("./routes/propType.route"));
app.use("/api/media", require("./routes/media.route"));
app.use("/api/dynamic", require("./routes/dynamic.route"));
app.use("/api/blog", require("./routes/blog.route"));
app.use("/api/session", require("./routes/session.route"));
app.use("/api/gallery", require("./routes/gallery.route"));
app.use("/api/venue", require("./routes/venue.route"));
app.use("/api/venueType", require("./routes/venueType.route"));
app.use("/api/venueAmenity", require("./routes/venueAmenity.route"));
app.use("/api/venueService", require("./routes/venueService.route"));
app.use("/api/venueSetting", require("./routes/venueSetting.route"));
app.use("/api/venueAward", require("./routes/venueAward.route"));
app.use("/api/venueVendor", require("./routes/venueVendor.route"));
app.use("/api/venueStandard", require("./routes/VenueStandard.route"));
app.use("/api/ceremonyType", require("./routes/ceremonyType.route"));
app.use("/api/news", require("./routes/news.route"));
// app.use("/api/upload", require("./routes/upload.route"));

app.use(error);

module.exports = app;
