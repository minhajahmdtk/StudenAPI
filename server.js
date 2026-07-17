const express=require('express');
const server=express();
const port=3000;
const studentRoutes=require('./routes/studentRoutes');
server.use(express.json());
server.use('/students',studentRoutes);

server.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})
