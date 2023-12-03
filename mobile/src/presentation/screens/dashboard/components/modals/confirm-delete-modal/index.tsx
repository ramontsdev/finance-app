import { useTheme } from "styled-components/native";
import { TrashIcon } from "../../../../../components/icons/trash-icon";
import { Modal } from "../../../../../components/modal";
import { Text } from "../../../../../components/text";
import { Button, Container, Wrap } from "./styles";

type Props = {
  onClose: () => void;
  title: string;
  description?: string;
  onConfirm: () => void;
}
export function ConfirmDeleteModal({ onClose, title, description, onConfirm }: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      onClose={onClose}
      title="Excluir"
      isOpen
    >
      <Container>
        <Wrap>
          <TrashIcon />

          <Text weight="700" color={colors.gray.default}>
            {title}
          </Text>

          {description && (
            <Text size={14} color={colors.gray.default}>
              {description}
            </Text>
          )}
        </Wrap>

        <Button
          variant="danger"
          onPress={onConfirm}
        >
          Sim, desejo excluir
        </Button>

        <Button
          variant="ghost"
          onPress={onClose}
        >
          Cancelar
        </Button>
      </Container>
    </Modal>
  )
}
