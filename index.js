const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const Code = require('./models/Code')
const Answer = require('./models/Answer')
const Extra = require('./models/Extra')
const Hint = require('./models/Hint')

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect('mongodb+srv://tanaroeg123:70iAIxB4kbJpnUYT@synerr.0bhhwiu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.get('/', (req, res) => {
    res.send('Just an API.')
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
        await Answer.findOneAndUpdate(
            { ans: req.body.ans }, 
            { isFinish: true }
        )
        res.json({
            "success": true
        })
    } else {
        res.json({
            "success": false
        })
    }
})

app.post('/api/redeem/', async (req, res) => {
    const redeem = await Code.findOneAndDelete({ key: req.body.key });
    if (redeem) {
        let extra = await Extra.findOneAndUpdate({ id: "62c90eb73fc9eebb5f8549db" }, { $inc: { 'num': 1 } })
        res.json({
            "success": true,
            "extra": extra.num + 1
        })
    } else {
        let extra = await Extra.findOne({ id: "62c90eb73fc9eebb5f8549db" })
        res.json({
            "success": false,
            "extra": extra.num
        })
    }
})

app.get('/api/extra/', async (req, res) => {
    let extra = await Extra.findOne({ id: "62c90eb73fc9eebb5f8549db" })
    res.json({
        "extra": extra.num
    })
})

app.post('/api/redeem/extra/', async (req, res) => {
    let extra = await Extra.findOne({ id: "62c90eb73fc9eebb5f8549db" })
    if (extra.num > 0 && req.body.hintNumber) {
        await Extra.findOneAndUpdate({ id: "62c90eb73fc9eebb5f8549db" } , { $inc: { 'num': -1 }})
        let hint = await Hint.findOneAndUpdate(
            { own: req.body.hintNumber },
            { isUnlock: true })
        res.json({
            "success": true
        })
    } else {
        res.json({
            "success": false
        })
    }
})

app.get('/api/hints/', async (req, res) => {
    let hint = await Hint.find({ isUnlock: true })
    res.json({hint})
})

app.listen(port, () => {
    console.log("Listen on port: " + port);
})

module.exports = app