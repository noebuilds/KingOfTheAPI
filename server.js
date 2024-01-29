const express = require('express');
const bodyParser = require('body-parser');
const { query } = require('express');
const app = express();
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'THE-KING-OF-THE-API'

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));
//database connection
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true}).then(client => {
    console.log('connected to database')
    const db = client.db(dbName)
    const quotesCollection = db.collection('quotes')
    //enter CRUDE commands

    app.get('/', (req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
   
    })
    
    app.post('/quotes', (req, res) => {
       quotesCollection.insertOne(req.body)
       .then(result => {
       res.redirect('/')
       })
       .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
        const namesToDelete = req.body.names; // Assuming the names are sent as an array
        quotesCollection.deleteMany({ name: { $in: namesToDelete } })
            .then(result => {
                // Handle the result if needed
                res.send({ message: 'Quotes deleted successfully' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send({ error: 'Error deleting quotes' });
            });
    });
    app.listen(process.env.PORT || PORT, function () {
        console.log('listening on port', PORT);
    });
})
.catch(error => console.error(error)); 

