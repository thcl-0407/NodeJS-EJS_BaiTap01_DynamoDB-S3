const aws_sdk = require('../../config/dynamo_conf.js')
const doc_client = new aws_sdk.aws_sdk.DynamoDB.DocumentClient();
const table_name = 'SinhVien'

function CreateItem(data, callback) {
    const params = {
        TableName: table_name,
        Item: {
            id: data.id,
            ma_sinhvien: data.ma_sinhvien,
            ten_sinhvien: data.ten_sinhvien,
            namsinh: data.namsinh,
            ma_lop: data.ma_lop,
            avatar: data.avatar
        }
    }

    doc_client.put(params, (err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
}


function UpdateItem(data, callback) {
    const params = {
        TableName: table_name,
        Key: {
            "id": String(data.id), //<----Bắt Buộc Có Hask Key
            "ma_sinhvien": String(data.ma_sinhvien)//<----Bắt Buộc Có Sort Key
        },
        UpdateExpression: "SET ten_sinhvien = :tensv, namsinh = :namsinh, ma_lop = :malop",
        ExpressionAttributeValues:{
            ':tensv': String(data.ten_sinhvien),//<----Cập Nhật Họ Tên Mới
            ':namsinh':String(data.namsinh),//<----Cập Nhật Năm Sinh Mới
            ':malop':String(data.ma_lop),//<----Cập Nhật Mã Lớp Mới
        },
        ReturnValues:"UPDATED_NEW"
    }

    doc_client.update(params, (err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
}

function UpdateAvatar(data, callback) {
    const params = {
        TableName: table_name,
        Key: {
            "id": String(data.id), //<----Bắt Buộc Có Hask Key
            "ma_sinhvien": String(data.ma_sinhvien)//<----Bắt Buộc Có Sort Key
        },
        UpdateExpression: "SET  avatar = :avatar",
        ExpressionAttributeValues:{
            ':avatar':String(data.avatar),//<----Cập Nhật Avatar Mới
        },
        ReturnValues:"UPDATED_NEW"
    }

    doc_client.update(params, (err) => {
        if (err) {
            callback(false)
        } else {
            callback(true)
        }
    })
}

function Get_All_Items(callback){
    const params = {
        TableName: table_name
    }

    doc_client.scan(params, (err, data)=>{
        if(err){
            callback(false)
        }else{
            callback(data.Items)
        }
    })
}

function DeleteItem(data, callback){
    const params = {
        TableName: table_name,
        Key:{
            "id": String(data.id), //<----Bắt Buộc Có Hask Key
            "ma_sinhvien": String(data.ma_sinhvien)//<----Bắt Buộc Có Sort Key
        }
    }

    doc_client.delete(params, (err, data)=>{
        if(err){
            callback(false)
        }else{
            callback(true)
        }
    })
}

module.exports = {
    Get_All_Items,
    CreateItem,
    UpdateItem,
    DeleteItem
}