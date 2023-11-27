import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';

import { v2 as cloudinary } from 'cloudinary';

import { ICreateFeedback } from '../../../domain/use-cases/feedback/create-feedback';
import { badRequest, noContent, serverError, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { File, HttpRequest, HttpResponse } from '../../protocols/http';

cloudinary.config({
  cloud_name: 'debrcpntt',
  api_key: '823855943454897',
  api_secret: 'TeXkOs6sTkYgdDHDcoK74IJx1eU',
});

export class FeedbackController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly createFeedback: ICreateFeedback,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.loadUserByRequest.loadUser(httpRequest);
      if (!user) return unauthorized();

      const { text } = httpRequest.body;
      if (!text) return badRequest({ error: 'Empty text' });

      const imagesFilenames: string[] = [];

      if (httpRequest.files && httpRequest.files.length > 0) {
        for await (const file of httpRequest.files) {
          if (!['.png', '.jpg'].includes(path.extname(file.filename))) {
            const changedFilename = file.filename.replace(path.extname(file.filename), '.jpg');
            imagesFilenames.push(changedFilename);
          } else {
            imagesFilenames.push(file.filename);
          }

          await this.uploadStream(file);
          fs.unlinkSync(path.resolve('tmp', file.filename));
        }
      }

      await this.createFeedback.create({
        userId: user.id,
        text,
        images: imagesFilenames,
      });

      return noContent();
    } catch (err) {
      const error = err as Error;
      console.log(error);

      return serverError();
    }
  }

  private uploadStream(file: File) {
    const imagePath = path.resolve('tmp', file.filename);
    const fileBuffer = fs.readFileSync(imagePath);

    return new Promise((resolve, reject) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        {
          public_id: path.parse(file.filename).name,
          folder: '/app-finance/feedbacks/images',
        },
        (err, result) => {
          if (err) return reject(err);

          return resolve(result);
        },
      );

      const str = Readable.from(fileBuffer);
      str.pipe(theTransformStream);
    });
  }

  private async upload(file: File) {
    const imagePath = path.resolve('tmp', file.filename);

    await cloudinary.uploader.upload(imagePath, {
      public_id: path.parse(file.filename).name,
      folder: '/app-finance/feedbacks/images',
    });
  }
}
