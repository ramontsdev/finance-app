import { useRef } from "react";
import { TextInput as NativeTextInput, TextInputProps, TouchableWithoutFeedback, View } from "react-native";
import { Label, TextError, TextInput, Wrap } from "./styles";

type Props = TextInputProps & {
  label?: string;
  errorMessage?: string;
  color?: string;
}
export function Input({ label, errorMessage, color, ...props }: Props) {
  const inputRef = useRef<NativeTextInput>(null);

  function handleFocus() {
    inputRef.current?.focus()
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <Wrap hasLabel={!!label}>
          {label && (
            <Label>
              {label}
            </Label>
          )}

          <TextInput
            ref={inputRef}
            color={color}
            {...props}
          />
        </Wrap>
      </TouchableWithoutFeedback>

      {errorMessage && <TextError>{errorMessage}</TextError>}
    </View>
  )
}
