import { useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { FabBody } from './fab-body';
import { Wrapper } from "./styles";

import PlusIcon from './plus_icon.svg';

export function Fab() {
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<TouchableOpacity>(null);

  const animation = useRef(new Animated.Value(0)).current;
  function toggleMenu() {
    const toValue = isOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();

    setIsOpen((prevState) => !prevState);
  }

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <>
      <FabBody
        isOpen={isOpen}
        onClose={toggleMenu}
        triggerRef={triggerRef}
      />

      <Wrapper
        ref={triggerRef}
        activeOpacity={1}
        onPress={toggleMenu}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 3,
        }}
      >
        <Animated.View style={rotation}>
          <PlusIcon />
        </Animated.View>
      </Wrapper>
    </>
  )
}
