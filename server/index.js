const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
const multer = require('multer')
const path = require('path');
const nodemon = require("nodemon");

//use express static folder
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Database connection
const db = mysql2.createPool({
  user: "root",
  host: "localhost",
  password: "YogeshJamdare@123",
  database: "project",
});




app.get("/getNews", (req,res) => {
  db.query("SELECT * FROM news ORDER BY news_id DESC", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getCity", (req,res) => {
  db.query("SELECT DISTINCT city FROM news", (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getFullNews/:news_id", (req, res) => {

  const news_id = req.params.news_id;
  // console.log("server"+ typeof(news_id));
  // console.log(news_id);
  db.query("SELECT * FROM news WHERE news_id = ?",news_id, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
});



app.get("/cityNews/:city", (req, res) => {

  const city = req.params.city;
  console.log(city);
  db.query("SELECT * FROM news WHERE city = ?",city, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
});


app.post("/insert", (req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const City= req.body.City;
  const Role = "reporter";
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Status = "pending";


  db.query(
    "INSERT INTO user (first_name,last_name,email,pwd,role,city,status) VALUES (?,?,?,?,?,?,?)",
    [FirstName,LastName,Email,Password,Role,City,Status],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.post('/signin', (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;

  // const { Email, Password } = req.body
  // console.log(Email + " -- " + Password)


  db.query("select * from user where email=? and pwd=?",[Email,Password], (error, result) => {
      //console.log(result[0])
      if(error){
        res.send({"error" : error});
      }
      if (result.length > 0) {
          res.send(result); 
          console.log("reporter logged in")
      } else {
          res.send.toString("Wrong Credentials");
          res.send(result); 
         console.log("Wrong Credentials"); 
      }
  })
})


//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});


// API call and query for Publish News Component.

app.post('/api/newspublish',upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No image upload");
}else{
  const title= req.body.title;
  const city=req.body.city;
  const category=req.body.category;
  const news_desc=req.body.news_desc;
  const created_on = new Date();
  const published_on = new Date();
  const news_status = req.body.news_status;
  console.log("Published Date:=> ",published_on);

  // console.log(req.file.filename)
  var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename

  var sqlInsert = "INSERT INTO news (title,city,category,created_on,published_on,news_status,news_desc,image) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [title, city, category,created_on,published_on,news_status,news_desc,imgsrc], (err, result) => {
    {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  }
  );
}
});

app.delete("/delete/:news_id", (req, res) => {

  const {news_id} = req.params;

  console.log(news_id);

  db.query("DELETE FROM news WHERE news_id = ?", news_id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.send(result);
    }
  });
});

app.get("/yournews", (req, res) => {
  db.query(`SELECT * FROM news`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})


app.get("/categoryNews/:category", (req, res) => {

  const category = req.params.category;
  console.log(category);
  db.query("SELECT * FROM news WHERE category = ?",category, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result)
    }
  });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
