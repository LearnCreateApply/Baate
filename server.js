const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const e = require('express');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/home.html'));
})
app.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'/templates/signup.html'));
})
app.get('/signin',(req,res)=>{
  res.sendFile(path.join(__dirname,'/templates/signin.html'));
})
app.post('/submit-signin',(req,res)=>{
  const {login,password } = req.body;
  fs.readFile('login.txt',(e,data) =>{
    if (data.includes(login) && data.includes(password)) {
      res.send('Success')
    }
    else{
      res.send('Invalid')
    }
  })
})
app.post('/submit-signup',(req,res)=>{
  const {email ,username,password } = req.body;
  fs.appendFile('login.txt',`email ${email} username ${username} password ${password}`,()=>{})
  res.send("User Added")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})