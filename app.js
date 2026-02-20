const express = require('express');
const mysql = require("mysql");
const app = express();
const db = mysql.createConnection({
  database: 'laravel',
  user: 'root',
  host: 'localhost',
  password: ''
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
db.connect((err) => {
  if(err) 
  {
    console.error("fail");
  } 
  else 
  {
    console.log("connection done");
  }
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/fetch',(req,res)=>{
const sql = "SELECT * FROM table_movie";
db.query(sql,(err,result)=>{
if(err)
{
 res.json({error:"error"});
}
else
{
 res.json(result);
}
});
});
app.post('/save', (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO table_movie (name,email) VALUES (?,?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) 
    {
      return res.send("insert error");
    }
    res.send("insert successfully");
  });
});
app.listen(3000, () => {
  console.log("server running on 3000");
});