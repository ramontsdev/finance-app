import { FeedbackDTO, ICreateFeedback } from '../../../../domain/use-cases/feedback/create-feedback';
import { prismaClient } from '../../postgres-db';

class DbCreateFeedback implements ICreateFeedback {
  async create(feedbackDTO: FeedbackDTO): Promise<void> {
    await prismaClient.feedback.create({
      data: {
        userId: feedbackDTO.userId,
        text: feedbackDTO.text,
        images: feedbackDTO.images,
      },
    });
  }
}

export const dbCreateFeedback = new DbCreateFeedback();
