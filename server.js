const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
// const { MONGOURI } = require('./config/keys'); 
const dotenv = require('dotenv')
const path = require('path') 
const cors=require("cors");


dotenv.config()
const PORT = process.env.PORT || 5000; 
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

mongoose.connect(
    process.env.DBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      console.log("Database connected");
})
.catch((err) => {
    console.log("error",err)
  })

require('./models/User'); 
require('./models/Post'); 
app.use(express.json()); 
app.use(require('./routes/auth')); 
app.use(require('./routes/post')); 
app.use(require('./routes/user')); 

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
// })

app.get('/', (req,res) => {
    res.send("working..||||")
})


app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 