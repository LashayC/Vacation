require("dotenv").config()
const bodyParser = require("body-parser");
const express = require("express");
const { resourceLimits } = require("worker_threads");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const fetch = require("node-fetch"); //installed vers 2.6.6


MongoClient.connect(process.env.MONGO_CONNECTION, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("vacation-wishlist");
    const wishlistCollection = db.collection("wishlist");

    app.set("view engine", "ejs");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.get("/", (req, res) => {
      db.collection("wishlist")
        .find()
        .toArray()
        .then((results) => {
          console.log("app.get results", results);
          res.render('index.ejs', {wishlist: results})

        })
        .catch((error) => console.error(error));
    });


    app.post('/wishlist',  (req, res) => {
      console.log("app.post results", req.body)

      let locationEncode = encodeURIComponent(req.body.location);
      let destinationEncode = encodeURIComponent(req.body.destination); 

      fetch( `https://api.unsplash.com/search/photos/?query=${(locationEncode, destinationEncode)}&orientation=landscape`, {
            headers: {
                'Authorization': process.env.PROJECT_API_KEY
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('url from fetch',data.results[0].urls.thumb)
            return data.results[0].urls.thumb ?  data.results[0].urls.thumb : 'images/defaultVacation.jpeg'

        })
        .then(imageURL => {
           wishlistCollection.insertOne({
                destination: req.body.destination,
                location: req.body.location,
                description: req.body.description,
                photo: imageURL
            })
            
        })
        .then(result => {
                res.redirect('/')
            }) 
        .catch(error => {
            console.log(error)
        })
      
    });

    app.put('/wishlist', (req, res) => {
        // quotesCollection.findOneAndUpdate(
        //     {name: 'yoda'}, //1 query
        //     {$set: {
        //         name: req.body.name,
        //         quote: req.body.quote
        //     }}//2 update
        // )
        // .then(result => {
        //     res.json('Success')
        //     console.log(result)
        // })
        // .catch(error => console.error(error))
        console.log(req.body)
    })

    app.listen(3000, function () {
      console.log("listening on 3000");
    });
  })
  .catch((error) => console.error(error));
