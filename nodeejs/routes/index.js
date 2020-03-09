var express = require('express');
var router = express.Router();
var connection  = require('../config/db');
var jwtconfig = require('../config/jwt');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var knexConfig = require('../config/knex');
const knex = require('knex')(knexConfig);

//require multer for the file uploads
var multer = require('multer');
var expressValidator = require('express-validator');


//var Book = require('../model/book');

/* GET home page. */
/** router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exptestress' });
});*/

router.get('/', function(req, res, next) {
	res.render('index', {page:'Home', menuId:'home'});
});

router.get('/about', function(req, res, next) {
	res.render('about', {page:'About', menuId:'about'});
});

router.get('/contact', function(req, res, next) {
	res.render('contact', {page:'Contact', menuId:'contact'});
});


router.post('/login',function(req,res,next){
	var username = req.body.email;
	var password = req.body.password;
	//console.log(req.body);
	passport.authenticate('local-login', function(err, user, info){
    //console.log(user)
    var token;

    // If Passport throws/catches an error
    if (err) {
    	res.status(404).json(err);
    	return;
    }

    // If a user is found
    if(user){
      //console.log("user Id", user.id);
      //res.status(200).json(user);
      const token = jwt.sign({ id: user.id },jwtconfig.secret, {
        expiresIn: 60 * 60,
      });
      res.status(200).json({
      	auth: true,
      	message: 'User Logged in successfully',
      	data: user,
      	token
      });

    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/booklist', verifyToken,function(req,res,next){
  /*Book.getAllBooks((err, body) => {
      if(err) return next(err);
      res.status(200).json({
       response: body
      });
  });*/
  knex.from('books').select('*')
  .where('status', 1)
  .then((rows) => {
      res.json(rows);
  }).catch((err) => { 
      console.log( err); throw err 
      res.status(500).json({error: err});
  })

  //console.log(req.token)
  /*jwt.verify(req.token, jwtconfig.secret, (err, authData) => {
    console.log("authData",authData)
    if(err) {
      res.sendStatus(403);
    } else {
      knex.from('books').select('*')
      .where('status', 1)
      .then((rows) => {
          res.json({
              response: rows
          });
      }).catch((err) => { 
          console.log( err); throw err 
          res.status(500).json({error: err});
      })
    }
  });*/
  return;
});


router.post('/bookAdd', verifyToken,function(req,res,next){
  //console.log(req.token)
  jwt.verify(req.token, jwtconfig.secret, (err, authData) => {
    //console.log("authData",authData)
    if(err) {
      res.sendStatus(403);
    } else {
      //console.log(req.body)
      //res.status(200).json(req.body);
      knex('books').insert({
        title:req.body.title,
        description:req.body.description,
        catelog:1,
        isbn:req.body.isbn,
        book_image:req.body.book_image,
        created_by:authData.id,
        created_at: new Date(),
        updated_at: new Date()
      })
      .then((rows) => {
         res.status(200).json({ success: true, message: 'ok' });  
      }).catch((err) => { 
        console.log( err); throw err 
        res.status(500).json({error: err});
      })
    }
  });
  return;
});

/** File Upload **/
/**
// set the directory for the uploads to the uploaded to
var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
//router.post("/file_uploads", upload.array("photo", 12), function (req, res) {
 router.post("/file_uploads", upload.array("photo"), function (req, res, next) {
  //console.log('files', req.files);
  res.status(200).json(req.files);
});   
*/
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './public/images/uploads/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
var upload = multer({ //multer settings
    storage: storage
}).single('photo');

/** API path that will upload the files */
router.post('/file_uploads', function(req, res) {
  upload(req,res,function(err){
    //console.log(req.file);
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({error_code:1,err_desc:multer.MulterError});
    } else if (err) {
      res.status(500).json({error_code:1,err_desc:err});
    }
    res.status(200).json(req.file);
    return;
  });
});

/** File Upload **/

module.exports = router;

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}


