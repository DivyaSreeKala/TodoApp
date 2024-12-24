
const express = require("express");
const cors = require("cors");

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

require("dotenv").config();

app.use(cors());

require('./db/connection')


const todoRoutes = require('./routes/todoRoutes');
app.use('/todo',todoRoutes);


const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dir", "index.html"))
})
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})