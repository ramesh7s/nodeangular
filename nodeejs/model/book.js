var knexConfig = require('../config/knex');
const knex = require('knex')(knexConfig)
var db = require('../config/db');
var Book={

  getAllBooks:function(callback){
    knex.from('books').select('*')
    .where('status', 1)
    .then((rows) => {
      return (rows,callback)
    }).catch((err) => { 
      console.log(err);throw err 
      //res.status(500).json({error: err});
    })
    //return db.query("Select * from books",callback);
  },
  getBookById:function(id,callback){
    return db.query("select * from books where Id=?",[id],callback);
  },
  addBook:function(Book,callback){
    return db.query("Insert into books values(?,?,?)",[Book.Id,Book.Title,Book.Status],callback);
  },
  deleteBook:function(id,callback){
    return db.query("delete from books where Id=?",[id],callback);
  },
  updateBook:function(id,Book,callback){
    return db.query("update books set Title=?,Status=? where Id=?",[Book.Title,Book.Status,id],callback);
  }

};
module.exports = Book;