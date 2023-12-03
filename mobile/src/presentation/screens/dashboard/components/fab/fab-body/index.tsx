import { RefObject, useEffect, useRef, useState } from "react";
import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { BankAccountIcon } from "../../../../../components/icons/BankAccountIcon";
import { CategoryIcon } from "../../../../../components/icons/categories/CategoryIcon";
import { Text } from "../../../../../components/text";
import { useDashboard } from "../../dashboard-context";
import { Body, Overlay, TouchOption } from "./styles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<TouchableOpacity>;
}

const dimensions = Dimensions.get('window');

export function FabBody({ isOpen, onClose, triggerRef }: Props) {
  const { openAddBankAccountModal, openAddTransactionModal } = useDashboard();

  const [bodyPositionTop, setBodyPositionTop] = useState(480);
  const [bodyPositionRight, setBodyPositionRight] = useState(16);

  const bodyRef = useRef<View>(null);

  useEffect(() => {
    triggerRef.current?.measure((
      triggerX, triggerY, triggerWidth, triggerHeight, triggerPageX, triggerPageY
    ) => {
      setBodyPositionRight(dimensions.width - triggerPageX - triggerWidth);

      bodyRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setBodyPositionTop(triggerPageY - height);
      })
    })
  }, [isOpen])

  const { colors } = useTheme();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
    >
      <Overlay onPress={onClose} />

      <Body
        ref={bodyRef}
        style={
          [{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
          },
          {
            top: bodyPositionTop,
            right: bodyPositionRight,
          }]
        }
      >
        <TouchOption onPress={() => { openAddTransactionModal('EXPENSE'); onClose(); }}>
          <CategoryIcon type="expense" />
          <Text color={colors.gray.default}>Nova Despesa</Text>
        </TouchOption>

        <TouchOption onPress={() => { openAddTransactionModal('INCOME'); onClose(); }}>
          <CategoryIcon type="income" />
          <Text color={colors.gray.default}>Nova Receita</Text>
        </TouchOption>

        <TouchOption onPress={() => { openAddBankAccountModal(); onClose(); }}>
          <BankAccountIcon />
          <Text color={colors.gray.default}>Nova conta</Text>
        </TouchOption>
      </Body>
    </Modal >
  )
}
