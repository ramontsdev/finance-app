import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { Label, Pressable, Wrap } from "./styles";

type Props = TouchableOpacityProps & {
  children: ReactNode;
  variant?: 'danger' | 'ghost' | 'default';
}
export function Button({ children, ...props }: Props) {
  return (
    <Wrap>
      <Pressable
        style={({ pressed }) => [
          pressed && { transform: [{ scale: 0.987 }] },
        ]}
        {...props}
      >
        <Label
          variant={props.variant}
        >
          {children}
        </Label>
      </Pressable>
    </Wrap>
  )
}
