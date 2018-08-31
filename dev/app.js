var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var app = express()
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
      let name = file.originalname
      if (name === 'blob') {
        name += '.png'
      }
      cb(null, name)
  }
})

let fileFilter = (req, file, cb) => {
  let type = file.mimetype.split('/')[0]
  if (type == 'image') {
      cb(null, true)
  } else {
      cb(null, false)
  }
}

var upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials','true')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.json({
    result: '上传图片成功！'
  })
})


app.listen(3000, function () {
  console.log('express 启动成功！')
})