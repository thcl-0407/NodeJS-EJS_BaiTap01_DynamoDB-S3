const PORT = 2000
const express = require('express')
const multer = require('multer')
const body_Parer = require('body-parser') 
const creat_item = require('./controller/dynamo/item_control.js')
const upload = multer()
const app = express()

//*************************************************************** */
app.use(body_Parer.json())

app.set('views', './views')
app.set('view engine', 'ejs')

//*************************************************************** */

//Render Trang Chủ
app.get('/', (req, res) => {
    res.render('home')
})

//Get Tất Cả Sinh Viên
app.get('/allsv', (req, res) => {
    let data = req.body

    if (data != null) {
        creat_item.Get_All_Items((result) => {
            if (!result) {
                res.render('error')
            } else {
                res.send(result)
            }
        })
    } else {
        res.render('error')
    }
})

//Thêm Sinh Viên
app.post('/themsv', (req, res) => {
    let data = req.body

    if (data != null) {
        creat_item.CreateItem(data, (status) => {
            if (status) {
                res.render('home')
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Cập Nhật Sinh Viên
app.patch('/capnhatsv', (req, res) => {
    let data = req.body

    if (data != null) {
        creat_item.UpdateItem(data, (status) => {
            if (status) {
                res.render('home')
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Xoá Sinh Viên
app.post('/xoasv', (req, res) => {
    let data = req.body

    if (data != null) {
        creat_item.DeleteItem(data, (status) => {
            if (status) {
                res.render('home')
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Upload Data
app.post('/uploadphoto', upload.single('avatar'), (req, res) => {
    //res.send(req.file.originalname)//<---Lấy Tên File
})

app.listen(PORT, ()=>{
    console.log("Running on PORT: " + PORT)
})