var Minio = require('minio')
// Instantiate the minio client with the endpoint
// and access keys as shown below.
var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'Ir6UDyY2SeJY8b9A',
    secretKey: 'n7fYL1I9dk9SVFxll0BN3RsaJkje5211'
});

const image = {
    rawFile: { path: "LanLaConTrai.jpg" },
    src: "blob:http://localhost:3001/4323422c-66a5-4e94-a692-d5c32234381e",
    title: "LanLaConTrai.jpg"
};

if (!image.rawFile || !image.rawFile.path) {
    // Handle the error or return an appropriate response
}

const url = image.src;

fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        var metaData = {
            'Content-Type': 'image/*',
        };

        // Using fPutObject API upload your file to the bucket europetrip.
        minioClient.fPutObject(
            'europetrip',
            'image.jpg',
            buffer,
            metaData,
            function (err, eta) {
                if (err) return console.log(err);
                console.log('File uploaded successfully.');
            },
        );
    });


