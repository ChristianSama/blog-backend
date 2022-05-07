import app from "./app";
import "dotenv/config";

//Start Server
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});