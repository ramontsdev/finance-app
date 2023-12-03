import { useRef } from "react";
import { TextInput as NativeTextInput, TextInputProps, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Label, TextError, TextInput, Wrap } from "./styles";

type Props = TextInputProps & {
  label?: string;
  errorMessage?: string;
  color?: string;
  darkColor?: boolean;
}
export function Input({ label, errorMessage, color, darkColor, ...props }: Props) {
  const inputRef = useRef<NativeTextInput>(null);

  function handleFocus() {
    inputRef.current?.focus();
  };

  const { colors } = useTheme();

  const currentColor = color
    ? color
    : darkColor
      ? colors.gray.default
      : undefined;

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <Wrap darkColor={darkColor} hasLabel={!!label}>
          {label && (
            <Label color={currentColor}>
              {label}
            </Label>
          )}

          <TextInput
            ref={inputRef}
            color={currentColor}
            {...props}
          />
        </Wrap>
      </TouchableWithoutFeedback>

      {errorMessage && <TextError>{errorMessage}</TextError>}
    </View>
  );
};
