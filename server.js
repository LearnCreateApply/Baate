const express = require('express');
const ejs = require('ejs')
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const e = require('express');
app.set('view engine', 'ejs');
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
app.post('/signin',(req,res)=>{
  const {login,password } = req.body;
  fs.readFile('login.txt',(e,data) =>{
    if (data.includes(login) && data.includes(password)) {
      ejs.render('userprofile',{username : `${login}`})
    }
    else{
      res.send('Wrong email or password')
    }
  })
})
app.post('/signup',(req,res)=>{
  const {email ,username,password } = req.body;
  fs.appendFile('login.txt',`email ${email} username ${username} password ${password}`,()=>{})
  res.redirect('/signin')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})