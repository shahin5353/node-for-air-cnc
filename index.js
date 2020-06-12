const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId; 

const uri = process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(bodyParser.json())

app.post('/add-apartment', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const apartment = req.body
    client.connect(err => {
        const collection = client.db("air-cnc").collection("apartment")
        collection.insert(apartment, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops)
            }
        })
    })
    
})

app.get('/apartment', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err =>{
        const collection = client.db("air-cnc").collection("apartment")
        collection.find().toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                res.send(documents)
            }
        })
    })
})


app.get('/apartment/:id', (req, res) => {
    const id = req.params.id;
    client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true })
    client.connect(err =>{
        const collection = client.db("air-cnc").collection("apartment")
        collection.find( {id} ).toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                console.log(id);
                res.send(documents[0])
            }
        })
    })
});

app.post('/add-experience', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const experience = req.body
    client.connect(err => {
        const collection = client.db("air-cnc").collection("experience")
        collection.insert(experience, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops)
            }
        })
    })
    
})

app.get('/experience', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err =>{
        const collection = client.db("air-cnc").collection("experience")
        collection.find().toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                res.send(documents)
            }
        })
    })
})
app.post('/add-homes', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const homes = req.body
    client.connect(err => {
        const collection = client.db("air-cnc").collection("homes")
        collection.insert(homes, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops)
            }
        })
    })
    
})

app.get('/homes', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    client.connect(err =>{
        const collection = client.db("air-cnc").collection("homes")
        collection.find().toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                res.send(documents)
            }
        })
    })
})

app.post('/add-booking', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const booking = req.body
    client.connect(err => {
        const collection = client.db("air-cnc").collection("booking")
        collection.insertOne(booking, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })
    
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening from port ${port}`))