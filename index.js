const express = require('express')
const app = express()
const port = 5000

app.post('/api/verify/', (req, res) => {
    return res.json({
        "status": 1
    })
})

app.listen(port, () => {
    console.log("Listen on port: " + port);
})