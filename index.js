const express = require('express')
const multer = require('multer')
const port = 3000
const app = express()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage }).single('userPhoto');

app.get('/upload-image', (req, res) => res.sendFile(__dirname + "/index.html"))

app.post('/api/photo', (req, res) => {
    upload(req, res, (err) => {
        !!err ? res.end("Upload failed.") : res.end("File is uploaded.")
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))