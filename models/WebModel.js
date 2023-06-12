const mongoose = require("mongoose");
var websiteSchema = new mongoose.Schema({
  domainName: {
    type: String,
  },
  wordCount: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
  webLink: {
    type: String,
  },
});

mongoose.model("weblink_detail", websiteSchema);
