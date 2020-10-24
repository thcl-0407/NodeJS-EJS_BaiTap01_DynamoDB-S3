const aws_sdk = require('aws-sdk')

const s3 = new aws_sdk.S3({
    endpoint: 'http://s3.ap-southeast-1.amazonaws.com',
    accessKeyId: 'AKIAYOYD3XKFGKXLN6MS',
    secretAccessKey: '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',
    Bucket: 'thcongloc',
});

module.exports = {s3}

  