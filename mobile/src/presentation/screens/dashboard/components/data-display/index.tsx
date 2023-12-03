import { useTheme } from "styled-components/native";
import { Label, Value, Wrapper } from "./styles";

type Props = {
  label?: string;
  value?: string;
  onPress?: () => void;
  darkColor?: boolean;
}
export function DataDisplay({ label, value, onPress, darkColor }: Props) {
  const { colors } = useTheme();

  const currentColor = darkColor
    ? colors.gray.default
    : undefined;

  return (
    <Wrapper
      activeOpacity={0.5}
      onPress={onPress}
    >
      {label && <Label color={currentColor}>{label}</Label>}
      <Value color={currentColor}>{value}</Value>
    </Wrapper>
  )
}
