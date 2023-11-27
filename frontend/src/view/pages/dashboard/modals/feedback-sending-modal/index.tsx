import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '../../../../../app/utils/cn';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';

import { useFeedbackSendingModalController } from './use-feedback-sending-modal-controller';

export function FeedbackSendingModal() {
  const {
    isFeedbackSendingModalOpen,
    closeFeedbackSendingModalOpen,
    errors,
    handleSubmit,
    register,
    isLoading,
  } = useFeedbackSendingModalController();

  return (
    <Modal
      title="Enviar feedback"
      open={isFeedbackSendingModalOpen}
      onClose={closeFeedbackSendingModalOpen}
    >
      <div className="w-full h-full">
        <small>Deixe aqui sua sugestão, reclamação ou elogio.</small>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 p-3 h-32 text-gray-800 focus:border-gray-800 transition-all outline-none',
              errors.text?.message && '!border-red-900',
              /* className, */
            )}
            placeholder="Nome da conta"
            {...register('text')}
          />
          {errors.text?.message && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{errors.text?.message}</span>
            </div>
          )}

          <small>Se quiser enviar uma imagem</small>

          <Input
            type="file"
            multiple
            {...register('files')}
          />

          <Button type="submit" className="w-full mt-10" isLoading={isLoading}>
            Enviar
          </Button>
        </form>
      </div>
    </Modal>

  );
}
