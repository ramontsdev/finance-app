import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { feedbackServices } from '../../../../../app/services/feedback-service';
import { useDashboard } from '../../components/dashboard-context/useDashboard';

const schema = z.object({
  text: z.string().min(10, 'Seu feedback deve ter pelo menos 10 caracteres.'),
  files: z.any(),
});

type FormValues = {
  text: string;
  files: Iterable<string> | ArrayLike<string>;
}

export function useFeedbackSendingModalController() {
  const { isFeedbackSendingModalOpen, closeFeedbackSendingModalOpen } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: '',
    },
  });

  const { mutateAsync, isLoading } = useMutation(feedbackServices.sendFeedback);

  const handleSubmit = hookFormSubmit(async (formValues) => {
    const formData = new FormData();

    Array.from(formValues.files)?.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('text', formValues.text);

    try {
      await mutateAsync(formData);
      toast.success('Seu feedback foi enviado!');
    } catch (error) {
      toast.error('Algo ao tentar enviar o feedback');
    }

    reset();
    closeFeedbackSendingModalOpen();
  });

  return {
    isFeedbackSendingModalOpen,
    closeFeedbackSendingModalOpen,
    errors,
    register,
    handleSubmit,
    isLoading,
    control,
  };
}
