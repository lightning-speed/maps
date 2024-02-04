
const express = require('express')
const bodyParser = require('body-parser');
const Maps = require("./Maps")
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.static("../maps_frontend"));

app.post('/api/get_map_data', (req, res) => {
  try {
    const data = req.body;

    console.log('Received POST request with data:',data);
    let ret = Maps.getMapData(data);
    
    res.status(200).json(ret);
  } catch (error) {
    console.error('Error handling POST request:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`opening wormhole at: ${port}`)
})