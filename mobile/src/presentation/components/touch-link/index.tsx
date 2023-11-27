import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { Label, TouchWrap } from "./styles";

type Props = TouchableOpacityProps & {
  children?: ReactNode;
}
export function TouchLink({ children, ...props }: Props) {
  return (
    <TouchWrap
      hitSlop={{
        left: 5,
        right: 5,
      }}
      {...props}
    >
      <Label>
        {children}
      </Label>
    </TouchWrap>
  )
}
