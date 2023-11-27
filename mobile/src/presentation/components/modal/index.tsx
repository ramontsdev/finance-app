import { ReactNode } from 'react';
import { Modal as NativeModal, Pressable, View } from 'react-native';
import { BodyModal, Container, Header, Overlay, Title } from './styles';

import CloseIcon from './close_icon.svg';

type Props = {
  rightIcon?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
export function Modal({ rightIcon, isOpen, onClose, title, children }: Props) {
  return (
    <NativeModal
      visible={isOpen}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <Container>
        <Overlay onPress={onClose} />

        <BodyModal>
          <Header>
            <Pressable onPress={onClose}>
              <CloseIcon />
            </Pressable>

            <Title>
              {title}
            </Title>

            <View>
              {rightIcon}
            </View>
          </Header>

          {children}
        </BodyModal>
      </Container>
    </NativeModal>
  )
}
