
const express = require("express");
const cors = require("cors");

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

require("dotenv").config();

app.use(cors());

require('./db/connection')

// require('./models/todoData')

const todoRoutes = require('./routes/todoRoutes');
app.use('/todo',todoRoutes);


const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})