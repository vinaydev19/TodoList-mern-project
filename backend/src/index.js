import app from "./app.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error on express app || ", error);
    });

    app.listen(port, () => {
      console.log(`server running on port no || ${port}`);
    });
  })
  .catch((error) => {
    console.log(`DB connection Failed || ${error}`);
  });
