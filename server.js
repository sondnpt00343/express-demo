const express = require("express");
const router = require("./src/routes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1", router);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
