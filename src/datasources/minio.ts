import {Buffer} from 'buffer';
var Minio = require('minio');

export const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'O93axwBOTMLNjVXi',
  secretKey: 'B4xQxIzbJloQB37dCXVoLL5SxgjtQyIb',
});

export const uploadFile = async (bucketName: any, baseString: any) => {
  try {
    const base64Data = baseString.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    var metaData = {
      'Content-Type': 'image/*',
    };
    const name = base64Data.slice(20, 40).replace(/[^a-zA-Z0-9]/g, '') + '.png';
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.putObject(
      bucketName,
      name,
      imageBuffer,
      metaData,
      function (err: any, eta: any) {
        if (err) return console.log(err);
      },
    );

    //const url = `http://${minioClient.host}:${minioClient.port}/${bucketName}/${name}`;
    const url = `http://[::1]:5000/image/${bucketName}/${name}`;
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
    return '';
  }
};
