import { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { Label, Pressable, Wrap } from "./styles";

type Props = TouchableOpacityProps & {
  children: ReactNode;
  variant?: 'danger' | 'ghost' | 'default';
  isLoading?: boolean;
}
export function Button({ children, isLoading, ...props }: Props) {
  return (
    <Wrap>
      <Pressable
        style={({ pressed }) => [
          pressed && { transform: [{ scale: 0.987 }] },
        ]}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {isLoading && (
          <ActivityIndicator size={"large"} />
        )}
        {!isLoading && (
          <Label
            variant={props.variant}
          >
            {children}
          </Label>
        )}
      </Pressable>
    </Wrap>
  )
}
