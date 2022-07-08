const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const Code = require('./models/Code')
const Answer = require('./models/Answer')

let cors = require("cors");
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://tanaroeg123:70iAIxB4kbJpnUYT@synerr.0bhhwiu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.post('/api/verify/', async (req, res) => {
    const code = await Code.find({ key: req.body.key })

    if ( code.length != 0 ) {
        await Code.findOneAndDelete({ key: req.body.key })
        res.json({
            "success": true
        })
    } else {
        res.json({
            "success": false
        })
    }
})

app.get('/api/answer/isfinish', async(req, res) => {
    const ans = await Answer.find({ isFinish: true })
    if ( ans.length != 0 ) {
        res.json({
            "finish": true
        })
    } else {
        res.json({
            "finish": false
        })
    }
})

app.post('/api/answer/verify', async (req, res) => {
    const ans = await Answer.find({ ans: req.body.ans })

    if ( ans.length != 0 ) {
        await Answer.findOneAndUpdate({ ans: req.body.ans }, { isFinish: true })
        res.json({
            "success": true
        })
    } else {
        res.json({
            "success": false
        })
    }
})

app.post('/api')

app.listen(port, () => {
    console.log("Listen on port: " + port);
})

module.exports = app