'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongs =require ('mongoose');
const app = express();
app.use(cors());



mongs.connect('mongodb://localhost:27017/book');

const BookSchema = new mongs.Schema({
  title:String,
  discription:String,
  status:String,


})


const Book = mongs.model('BookModel',BookSchema);







async function seedData(){
  const firstBook = new Book ({
    title:"anatomy",
    discription:"Medical subjects",
    status:"available"

  })
  const secondBook = new Book ({
    title:"liguastics",
    discription:"English language subjects",
    status:"deserved"

  })
  const thirdBook = new Book ({
    title:"special subject in computer engineer",
    discription:"computer language subjects",
    status:"not exist"

  })
  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();

}
seedData();





const PORT = process.env.PORT || 3001;
//http://localhost:3001/test
app.get('/test', (request, response) => {

  response.send('test request received')

})

//http://localhost:3001/book
app.get('/book',getbookHandler);
function getbookHandler (req,res){
  BookModel.find({},(err,result)=>{
    if(err){
      console.log('error');
    }
    else{
      res.json(result);
    }

  })
    
  
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));
