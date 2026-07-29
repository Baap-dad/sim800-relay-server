const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db = {
  "DEVICE_001": {
    1: {state:0, duration:0, ts:0},
    2: {state:0, duration:0, ts:0},
    3: {state:0, duration:0, ts:0},
    4: {state:0, duration:0, ts:0},
  }
};

app.get('/', (req,res)=> res.send("SIM800L Relay Server Running"));

app.get('/device/:id', (req,res)=>{
  res.json(db[req.params.id] || {});
});

app.post('/device/:id', (req,res)=>{
  const {ch, state, duration} = req.body;
  if(!db[req.params.id]) db[req.params.id] = {};
  db[req.params.id][ch] = {state, duration: duration||0, ts: Date.now()};
  console.log(`CMD -> Device ${req.params.id} Relay ${ch} = ${state} for ${duration}s`);
  res.json({ok:true});
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log("Server on", PORT));
