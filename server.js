const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/home.html'));
})
app.get('/signup',(req,res)=>{
  res.send('LOet do it');
})
app.get('/signin',(req,res)=>{
  res.send('LOet do it');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})