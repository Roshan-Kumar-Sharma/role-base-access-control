const express = require("express");

const app = express();

require("dotenv").config();

app.use(require("./routes/app.routes"));

app.use((err, req, res, next) => {
    // console.log(err);
    res.send({
        ERROR: {
            status: err.status || 500,
            message: err.message || "something went wrong",
        },
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("server is running at : ", PORT);
});
