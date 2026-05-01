require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

const dbConnect = require("./config/database");
dbConnect();

const userRoutes = require("./routes/user");
app.use("/api/v1", userRoutes);

const projectRoutes = require("./routes/project");
app.use("/api/v1", projectRoutes);

const taskRoutes = require("./routes/task");
app.use("/api/v1", taskRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/v1", dashboardRoutes);

app.get("/", (req,res)=>{
    res.send("Server is running");
});

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
});