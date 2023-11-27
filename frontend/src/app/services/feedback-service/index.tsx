import { httpClient } from '../http-client';

async function sendFeedback(feedback: FormData) {
  const { data } = await httpClient.post('/feedbacks', feedback, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export const feedbackServices = {
  sendFeedback,
};
