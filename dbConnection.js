const mongoose = require("mongoose");
require('dotenv').config();

let con = mongoose.connect(process.env.DB_LINK);
