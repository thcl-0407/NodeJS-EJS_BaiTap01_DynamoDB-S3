const s3 = require('../../config/s3_conf.js')

function UploadData(data, callback) {
  var params = {
    Bucket: "thcongloc",
    Key: data.filename,
    Body: data.file
  }

  s3.s3.upload(params, (error) => {
    if (error) {
      callback(false)
    } else {
      callback(true)
    }
  })
}

async function GetObject(data, callback) {
  var params = {
    Bucket: "thcongloc",
    Key: data.filename,
  }

  await s3.s3.getObject(params, (error, data) => {
    if (error) {
      callback(false)
    } else {
      callback(data.Body)
    }
  })
}

async function DeleteObject(filename, callback) {
  var params = {
    Bucket: "thcongloc",
    Key: filename
  }

  await s3.s3.deleteObject(params, (error) => {
    if (error) {
      callback(false)
    } else {
      callback(true)
    }
  })
}

module.exports = { UploadData, GetObject, DeleteObject }