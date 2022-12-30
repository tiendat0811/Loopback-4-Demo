import {Buffer} from 'buffer';
var Minio = require('minio');
var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'Ir6UDyY2SeJY8b9A',
  secretKey: 'n7fYL1I9dk9SVFxll0BN3RsaJkje5211',
});
const {promisify} = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
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
    const url = await minioClient.presignedGetObject(bucketName, name, 1000);
    return url;
  } catch (error) {
    console.log(error);
    return '';
  }
};
