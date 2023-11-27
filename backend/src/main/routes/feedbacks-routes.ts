import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { dbCreateFeedback } from '../../infra/database/repositories/feedback/db-create-feedback';
import { FeedbackController } from '../../presentation/controllers/feedback/feedback-controller';
import { adaptRoute } from '../adapters/express-router-adapter';
import { makeLoadUserByRequest } from '../factories/helpers/load-user-by-request-factory';

export const feedbacksRoutes = Router();

const loadUserByRequest = makeLoadUserByRequest();
const feedbackController = new FeedbackController(loadUserByRequest, dbCreateFeedback);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      // callback(null, path.resolve(__dirname, '..', '..', '..', 'tmp'));
      callback(null, path.resolve('tmp'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`.replace(/ /g, '_'));
    },
  }),
});

feedbacksRoutes.post('/feedbacks', upload.array('images'), adaptRoute(feedbackController));
