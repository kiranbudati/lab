const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const api = require('./routes/api');
const bodyParser = require('body-parser')
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.url,(err) => {
     if(err){
         console.log("Erro :",err); 
     }
     else{
         console.log('Database connceted');
     }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api',api);

app.use(express.static(__dirname + '/h-labs/dist/h-labs'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/h-labs/dist/h-labs/index.html'));
});
app.listen( process.env.PORT || 3000,() => {
    console.log("local host 3000");
});