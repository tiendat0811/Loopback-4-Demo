var Minio = require('minio');
var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'O93axwBOTMLNjVXi',
  secretKey: 'B4xQxIzbJloQB37dCXVoLL5SxgjtQyIb',
});

var bucketName = 'product-image';
var name = 'SABIAAD4gHYSUNDX1BS.png'

const getURL = async () => {
const object = await minioClient.getObject(bucketName, name);
console.log(object);
}

getURL();

