const mongoose = require("mongoose");
const connectionLink = require("./creds").creds.dbLink;

let con = mongoose.connect(connectionLink);
