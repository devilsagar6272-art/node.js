const express = require('express');
const mysql = require('mysql');
const app = express();
const connetion = mysql.createConnection({
    database:'laravel',
    host:'localhost',
    user:'root',
    password:''
  });
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
connetion.connect((err)=>{
if(err) console.error("contion fail");
else console.log("connetion insert");
});
app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/index.html");
})
app.post('/save',(req,res)=>{
 const {name,email} = req.body;
 const sql ="INSERT INTO table_movie (name,email)VALUES(?,?)";
 connetion.query(sql,[name,email],(err,result)=>{
   if(err)
   {
    return res.send("insert fail");
   }
   else
    {
      res.send("insert Succefully",result);
    }
 });
});
app.listen(3000, ()=>{
console.log("server are connetion");
});
let mypromise = () => new Promise((reject,resolve)=>{
let success = false;

if(success)
{
  resolve("abhi aya bro");
}
else
{
  reject("abhi nahi bro");
}
});
async function run() 
{
  await delay(30000);   // 30 sec wait
  await mypromise();
}
run(); 
$("#myfortable").DataTable({
ajax:{
 url:'/insert',
 type:'post'
},
columns:[
  {data:'email'},
  {data:'name'},
  {data:'image',
  render:function(data)
  {
      return `<img src="storage/${data}" width="60px">`;
  }
  },
  {
    data:'id',
    render:function(data)
    {
      return `<button class="btn btn-dark delete" data-id="${data}">delete</button>`;
    }
  }
]
});
$("#form").on('submit','.delete',function(e){
 e.preventDefault();
 name = $().val();
 email = $().val();
 id = $(this).data('id');
 $.ajax({
  url:'/delete/' + id,
  type:'get',
  data:{name:name,email:email},
  processData:false,
  dataType:'json',
  cotentType:false,
  success:function(data)
  {
   console.log(data);
  },
  error:function(e)
  {
   console.log(e);
  }
 });
});