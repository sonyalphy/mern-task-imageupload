const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Photos = require('./models/Photos')
const multer = require('multer')
//init app
const app = express()
mongoose.connect(`mongodb+srv://sony:sony%401234@cluster1.zeyp2h3.mongodb.net/`, {useUnifiedTopology: true, useNewUrlParser: true})

app.use(cors())
app.use(express.json())
const upload = multer()

//routes

app.get('/', async(req,res) => {
    try{
        const data = await Photos.find().where('public').equals(true)
        res.json(data)
    }
    catch(err){
        res.send(err)
    }
})

app.get('/u/', async (req,res) => {
    try{
        console.log(req.body);
        console.log(req.headers);
        const photos = await Photos.find().where('uid').equals(req.headers.id)
        res.json(photos)
    }
    catch(err){
        res.send(err)
    }
})

app.post('/upload', upload.single('file') ,async (req,res) => {
    console.log(req.file);
    const ext = req.file.mimetype.split('/')[0]
    const photoURL = req.file.buffer.toString('base64')
    console.log(req.body.visible);
    if(req.body.visible == 'true'){
        req.body.visible = true
    }
    else{
        req.body.visible = false
    }
    console.log(req.body.ext);
    if(ext == 'image'){
        try{
            await Photos.create({
                name: req.body.name,
                uid: req.body.uid,
                photoURL,
                ext: req.body.ext,
                size: req.file.size,
                public: req.body.visible
            })
            res.json({message: 'Image Uploaded'})
        }
        catch(err){
            res.send(err)
        }
    }
    // const {uid, photoURL, ext, size, public} = req.body
})
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}
// Listen to request
app.listen(8000)