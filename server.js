require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const empLogin = require("./Routes/empLogin");
const employeeRoutes = require("./Routes/employee");
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:2112",
      process.env.API_BASE_URL,
      "https://employee-management-client-pearl.vercel.app",
    ],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Part of Employee Management System");
});

app.use("/auth", empLogin);
app.use("/emp", employeeRoutes);

const port = process.env.PORT || 2112;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
