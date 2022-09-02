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


    async function getVacationImage(location, destination){
        let locationEncode = encodeURIComponent(location)
        let destinationEncode = encodeURIComponent(destination)
    
        
        try {
            let response = await fetch( `https://api.unsplash.com/search/photos/?query=${(locationEncode,destinationEncode)}&orientation=landscape`, {
                headers: {
                    'Authorization': process.env.PROJECT_API_KEY
                }
            })
            let result = await response.json()
            // let imageURL = result.results[0].urls.thumb
            return result.results[0].urls.thumb ? result.results[0].urls.thumb : 'images/defaultVacation.jpeg'
        } catch (error) {
                console.log(`error: ${error}`)
        }
    
    }

       app.post('/wishlist', async (req, res) => {
        let imageURL = await getVacationImage(req.body.location, req.body.destination)

        wishlistCollection.insertOne({
            destination: req.body.destination,
            location: req.body.location,
            description: req.body.description,
            photo: imageURL
        })
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
            console.log(req.body)
    })


    app.put('/wishlist', (req, res) => {
        // quotesCollection.findOneAndUpdate(
        //     {_id: req.body.cardObjectID}, //1 query
        //     {$set: {
        //         destination: req.body.destination,
        //         location: req.body.location,
        //         description: req.body.description
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
