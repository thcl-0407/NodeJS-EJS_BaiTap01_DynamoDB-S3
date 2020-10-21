const aws_sdk = require('aws-sdk')

aws_sdk.config.update({
    region: 'ap-southeast-1',
    endpoint: 'http://dynamodb.ap-southeast-1.amazonaws.com',
    accessKeyId: 'AKIAYOYD3XKFL4YQSQ7V',
    secretAccessKey: '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'
})

module.exports = {aws_sdk}