import { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, TouchableOpacity, View } from "react-native";
import { Items } from "./items";
import { DropdownBody, Overlay } from "./styles";

const deviceDimensions = Dimensions.get('window');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<TouchableOpacity>
}
export function DropdownMenu({ isOpen, onClose, triggerRef }: Props) {
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

  const [dropdownPositionTop, setDropdownPositionTop] = useState(0);
  const [dropdownPositionLeft, setDropdownPositionLeft] = useState(0);

  const dropdownRef = useRef<View>(null);

  function openDropdown() {
    triggerRef.current?.measure((
      triggerX, triggerY, triggerWidth, triggerHeight, triggerPageX, triggerPageY
    ) => {
      const triggerMarginRight = deviceDimensions.width - triggerPageX - triggerWidth
      setDropdownPositionTop(triggerPageY + triggerHeight);

      dropdownRef.current?.measure((
        dropdownX, dropdownY, dropdownWidth, height, pageX, pageY
      ) => {
        setDropdownPositionLeft(deviceDimensions.width - dropdownWidth - triggerMarginRight);
      })
    })

    setTimeout(() => {
      setIsVisibleDropdown(true);
    }, 100)
  }

  useEffect(() => {
    if (isOpen)
      openDropdown()
  }, [isOpen])

  return (
    <Modal
      visible={isOpen}
      transparent
    >
      <Overlay onPress={onClose} />

      <DropdownBody
        ref={dropdownRef}
        style={{
          top: dropdownPositionTop,
          left: dropdownPositionLeft,
          opacity: isVisibleDropdown ? 1 : 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <Items onClose={onClose} />
      </DropdownBody>
    </Modal>
  )
}
