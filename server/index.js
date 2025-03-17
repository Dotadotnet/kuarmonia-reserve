
/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal imports */
const app = require("./app");
const consoleMessage = require("./utils/console.util");
const port = process.env.PORT || 3000;

/* database connection */

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,

  })
  .then(() => consoleMessage.successMessage("Connected to MongoDB."))
  .catch((error) => consoleMessage.errorMessage(error.message));

/* establish server port */
app.listen(port, () => {
  consoleMessage.warningMessage(`Server is running on port ${port}.`);
});
