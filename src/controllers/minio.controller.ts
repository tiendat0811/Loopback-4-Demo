import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  Response,
  param,
} from '@loopback/rest';
import {minioClient} from '../datasources/minio';
export class MinioController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/image/{bucket}/{imageName}')
  @response(200, {
    description: 'Image',
    content: {
      'image/jpeg': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async getImage(
    @param.path.string('bucket') bucket: string,
    @param.path.string('imageName') imageName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const stat = await minioClient.statObject(bucket, imageName);
    const {size, metaData} = stat;
    response.writeHead(200, {
      ...metaData,
      'Content-Type': 'application/octet-stream',
      'Accept-Ranges': 'bytes',
      'Content-Length': size,
      'Content-Disposition': `attachment; filename="${imageName}"`,
      'Content-Meta': JSON.stringify(metaData),
    });
    minioClient.getObject(bucket, imageName, (err: any, stream: any) => {
      if (err) {
        response.status(500).send(err);
        return;
      }
      stream.pipe(response);
    });
  }
}
