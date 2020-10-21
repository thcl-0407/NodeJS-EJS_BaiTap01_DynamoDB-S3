const aws_sdk = require('../../config/dynamo_conf.js')
const doc_client = new aws_sdk.aws_sdk.DynamoDB.DocumentClient();

var params = {
	TableName : "SinhVien",
	KeySchema: [
		{ AttributeName: "id", KeyType: "HASH"},  //Partition key
		{ AttributeName: "ma_sinhvien", KeyType: "RANGE" }  //Sort key
	],
	AttributeDefinitions: [
		{ AttributeName: "id", AttributeType: "S" },
		{ AttributeName: "ma_sinhvien", AttributeType: "S" }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

dynamodb.createTable(params, function(err, data) {
	if (err) {
		console.error("Có Lỗi Xảy Ra Khi Tạo Table: ", JSON.stringify(err, null, 2));
	} else {
		console.log("Tạo Table Thành Công !", JSON.stringify(data, null, 2));
	}
});

