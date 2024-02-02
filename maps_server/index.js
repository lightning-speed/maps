
const express = require('express')
const app = express()
const port = 3000


app.use(express.static("../maps_frontend"));

app.listen(port, () => {
  console.log(`opening wormhole at: ${port}`)
})