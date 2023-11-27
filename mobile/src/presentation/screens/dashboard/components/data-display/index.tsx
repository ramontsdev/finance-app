import { Label, Value, Wrapper } from "./styles";

type Props = {
  label?: string;
  value?: string;
  onPress?: () => void;
}
export function DataDisplay({ label, value, onPress }: Props) {
  return (
    <Wrapper
      activeOpacity={0.5}
      onPress={onPress}
    >
      {label && <Label>{label}</Label>}
      <Value>{value}</Value>
    </Wrapper>
  )
}