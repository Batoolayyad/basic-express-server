'use strict';
const express=require('express');
const app= express();
const notFoundHandler=require('./error-handlers/500');
const errorHandler=require('./error-handlers/404');
const logger = require('./middleware/logger');
const validation=require('./middleware/validator');



//http://localhost:3000/person?name=
app.get('/person',validation,(req,res)=>{
  console.log(req.query.name);
  const name=req.query.name;
  res.status(200).json({ name: name});
});

app.use(express.json());
app.use('*',notFoundHandler);
app.use(errorHandler);
app.use(logger);

module.exports={
  server: app,
  start:(port)=>{
    app.listen(port, ()=>console.log(`listening on ${port}`));
  },
};
