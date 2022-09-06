'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongs = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.json())

mongs.connect('mongodb://localhost:27017/book')

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

//http://localhost:3010/book
app.post('book', createHandler)
async function createHandler (req, res) {
  await BookModel.create({
    title: req.body.booktitle,
    discription: req.body.bookdiscription,
    status: req.body.bookstatus
  })
  BookModel.find({}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log('Done')
    }
  })
}

const PORT = process.env.PORT || 3001
//http://localhost:3001/test
app.get('/test', (request, response) => {
  response.send('test request received')
})

//http://localhost:3001/book
app.get('/book', getbookHandler)
function getbookHandler (req, res) {
  BookModel.find({}, (err, result) => {
    if (err) {
      console.log('error')
    } else {
      res.json(result)
    }
  })
}

app.delete('/deletebook/:id',deleteHandler);
function deleteHandler(req,res) {
  const bookId = req.params.id;
  KittenModel.deleteOne({_id:bookId},(err,result)=>{
      
      BookModel.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              // console.log(result);
              res.send(result);
          }
      })

  })
  
}

app.listen(PORT, () => console.log(`listening on ${PORT}`))
