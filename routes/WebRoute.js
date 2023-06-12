const express = require("express");
const { default: mongoose } = require("mongoose");
var router = express.Router();
const axios = require("axios");
const Webmodel = mongoose.model("weblink_detail");
const url = require('url');
const { hostname } = require("os");

router.get("/", (req, res) => {
  res.render("WebView/indexView");
});

router.post("/", async (req, res) => {
  var website = new Webmodel();
  const Weburl = req.body.domain;

  const urlObject = url.parse(Weburl,true);
  const hostName = urlObject.hostname;
  const protocol = urlObject.protocol;
  const domainname = protocol +"//" + hostName;


  const details = await count(Weburl);
  const wordcount = Object.keys(details).length;


  website.domainName = domainname;
  website.wordCount = wordcount;
  website.webLink = urlObject.href;
  website.save((err, data) => {
    if (!err) {
      res.redirect("/websrape/website/getrecords");
     
    } else {
      console.log("Error" + err);
    }
  });
})


function count(weburl) {
  return axios
    .get(weburl)
    .then((res) => {
      const urldata = res.data
      .toString()
      .replace(/[^A-Za-z']+/g, " ")
      .trim();
    const ldata = urldata.toLowerCase();
    let wordObj = {};
  const wordarray = ldata.split(" ").filter((data) => data !== "");

  for (let m = 0; m < wordarray.length; m++) {
    const key = wordarray[m];
    wordObj[key] = wordObj[key] + 1 || 1;
  }
  return wordObj;
    })
    .catch((err) => {
      console.log(err);
    });
}


router.get("/getrecords", (req, res) => {
  Webmodel.find((err, data) => {
    if (!err) {
      res.render("WebView/detailsView", {
        rec: data,
      });
    } else {
      console.log("Error" + err);
    }
  });
});

router.get("/update/:id", (req, res) => {
  Webmodel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { favourite: true } },
    (err, data) => {
      if (!err) {
        res.redirect("/websrape/website/getrecords");
      } else {
        console.log("Error"+err);
      }
    }
  );
});

router.get("/delete/:id", (req, res) => {
  Webmodel.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.redirect("/websrape/website/getrecords");
    } else {
      console.log("Error"+err);
    }
  })
});

module.exports = router;
