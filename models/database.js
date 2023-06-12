const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abimeena:abi123@cluster0.zydhvow.mongodb.net/webscraping",
  { useNewUrlParser: true },
  (error) => {
    if (!error) {
      console.log("DB Connected Successfully");
    } else console.log("Error" + error);
  }
);

require("./WebModel");
