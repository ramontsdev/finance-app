import { RefObject, useEffect, useState } from "react";
import { Dimensions, FlatList, Modal, TouchableOpacity } from "react-native";
import { Body, Label, Option, OverflowClose } from "./styles";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: RefObject<TouchableOpacity>;
  onSelect: (option: { value: string; label: string; }) => void;
  options: Array<{ value: string; label: string; }>;
}

const dimensions = Dimensions.get('window');

export function OptionWrapper({ isOpen, onClose, triggerRef, onSelect, options }: Props) {
  const [triggerWidth, setTriggerWidth] = useState(0);

  const [bodyPositionTop, setBodyPositionTop] = useState(493.81);
  const [bodyPositionRight, setBodyPositionRight] = useState(16);

  useEffect(() => {
    triggerRef.current?.measure((
      triggerX, triggerY, triggerWidth, triggerHeight, triggerPageX, triggerPageY
    ) => {
      setTriggerWidth(triggerWidth);
      setBodyPositionRight(dimensions.width - triggerPageX - triggerWidth);
      setBodyPositionTop(triggerPageY + triggerHeight);
    })
  }, [isOpen]);

  return (
    <Modal
      transparent
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <OverflowClose onPress={onClose} />

      <Body
        style={{
          width: triggerWidth,
          right: bodyPositionRight,
          top: bodyPositionTop,
          position: 'absolute'
        }}
      >
        <FlatList
          data={options}
          renderItem={({ item: option }) => (
            <Option onPress={() => { onSelect(option); onClose(); }}>
              <Label>
                {option.label}
              </Label>
            </Option>
          )}
        />
      </Body>
    </Modal>
  )
}
