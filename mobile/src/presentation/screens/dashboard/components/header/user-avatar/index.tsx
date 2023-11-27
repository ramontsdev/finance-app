import { forwardRef } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useAuth } from "../../../../../../contexts/auth-context";
import { Label, Wrap } from "./styles";

type Props = TouchableOpacityProps & {}

export const UserAvatar = forwardRef<TouchableOpacity, Props>((props, ref) => {
  const { user } = useAuth();
  return (
    <Wrap
      {...props}
      ref={ref}
    >
      <Label>
        {user?.name.substring(0, 2).toLocaleUpperCase()}
      </Label>
    </Wrap>
  )
})
