'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongs = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json())
const { response } = require('express');






//mongs.connect('mongodb://localhost:27017/book')

mongs.connect(`mongodb://books:Ashar121299@ac-ogxaou4-shard-00-00.vnq50b2.mongodb.net:27017,ac-ogxaou4-shard-00-01.vnq50b2.mongodb.net:27017,ac-ogxaou4-shard-00-02.vnq50b2.mongodb.net:27017/?ssl=true&replicaSet=atlas-103vtc-shard-0&authSource=admin&retryWrites=true&w=majority`);

const PORT = process.env.PORT || 3001
//http://localhost:3001/test
app.get('/test.', (request, response) => {
  response.send('test request received')
})

const BookSchema = new mongs.Schema({
  title: String,
  discription: String,
  status: String
})

const Book = mongs.model('BookModel', BookSchema)

async function seedData () {
  const firstBook = new Book({
    title: 'anatomy',
    discription: 'Medical subjects',
    status: 'available'
  })
  const secondBook = new Book({
    title: 'liguastics',
    discription: 'English language subjects',
    status: 'deserved'
  })
  const thirdBook = new Book({
    title: 'special subject in computer engineer',
    discription: 'computer language subjects',
    status: 'not exist'
  })
  await firstBook.save()
  await secondBook.save()
  await thirdBook.save()
}
//seedData();






//http://localhost:3001/book
app.get('/book', getbookHandler)
function getbookHandler (req, res) {
  Book.find( {}, (err, result) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.json(result)
    }
  }
  )
}

app.post('/book', addHandler);

async function addHandler(req,res) {
  console.log(req.body);
  
  const {title,discription,status} = req.body; 
  await Book.create({
      title:title,
      discription:discription,
      status:status
  });

  Book.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          
          res.send(result);
      }
  })
}
app.delete('/book/:id',deleteHandler);
 
function deleteHandler(req,res) { 
  const bookId = req.params.id; 
  Book.deleteOne({_id:bookId},(err,result)=>{
      
      Book.find({},(err,result)=>{ 
          if(err)
          {
              console.log(err);
          }
          else
          {
             
              res.send(result);
          }
      })

  })
  
}




app.listen(PORT, () => console.log(`listening on ${PORT}`))
