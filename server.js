const user = require("./models/userModel");
const mongoose = require("mongoose");
const app = require("./app");
const userController = require("./controllers/userContrtoller");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("db connection succesful");
  });
app.post("/signups", userController.signup);
app.post("/login", userController.login);
app.get("/getalldata", userController.protect, userController.getAllUsers);
const port = 3000;
app.listen(port, () => {
  console.log(`server runing on port no ${port}`);
});
