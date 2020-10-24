const PORT = 2000
const express = require('express')
const multer = require('multer')
const s3 = require('./controller/s3/s3.js')
const body_Parer = require('body-parser') 
const item_control = require('./controller/dynamo/item_control.js')
const upload = multer()
const app = express()

//*************************************************************** */
app.use(body_Parer.json())

app.set('views', './views')
app.set('view engine', 'ejs')

//*************************************************************** */

//Get Tất Cả Sinh Viên
app.get('/', (req, res) => {
    let data = req.body

    if (data != null) {
        item_control.Get_All_Items((data) => {
            if (!data) {
                res.render('error')
            } else {
                /*
                 var filename = {
                    filename: '160342648459902.jpg',
                }

                s3.GetObject(filename, (result)=>{
                    if(result){
                        let buff = new Buffer.from(result, 'base64');
                        let img = buff.toString('base64');
                        
                        res.render('home', {
                            sinhviens: data,
                            file: "data:image/png;base64," + img
                        })
                    }else{
                        res.redirect('/')
                    }
                })*/

                res.render('home', {
                    sinhviens: data
                })
            }
        })
    } else {
        res.render('error')
    }
})

//Thêm Sinh Viên
app.post('/themsv', upload.single('avatar'), (req, res) => {
    let data = {
        id: req.body.id,
        ma_sinhvien: req.body.masinhvien,
        ten_sinhvien: req.body.tensinhvien,
        namsinh: req.body.namsinh,
        ma_lop: req.body.malop,
        avatar: Date.now() + req.file.originalname,
        file: req.file.buffer
    }

    if (data != null) {
        item_control.CreateItem(data, (status) => {
            if (status) {
                res.redirect('/')
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Cập Nhật Sinh Viên
app.patch('/capnhatsv',  upload.single('avatar'), (req, res) => {
    let data = req.body
    
    if (data != null) {
        item_control.UpdateItem(data, (status) => {
            if (status) {
                res.send(true)
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Xoá Sinh Viên
app.get('/xoasv/id=:id&masv=:masv', (req, res) => {
    let data = {
        id: req.params.id,
        ma_sinhvien: req.params.masv
    }

    if (data != null) {
        item_control.DeleteItem(data, (status) => {
            if (status) {
                res.redirect('/')
            } else {
                res.render('error')
            }
        })
    } else {
        res.render('error')
    }
})

//Get Item
app.get('/id=:id&masv=:masv', (req, res)=>{
    let data = {
        id: req.params.id,
        ma_sinhvien: req.params.masv
    }

    if(data != null){
        item_control.GetItem(data, (result)=>{
            if(!result){
                res.send(false)
            }else{
                res.send(result)
            }
        })
    }
})

//Cập Nhật Avatar
app.post('/updateavatar',(req, res)=>{
    
})

app.listen(PORT, ()=>{
    console.log("Running on PORT: " + PORT)
})