import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { Logo } from "../logo";
import { Container } from "./styles";

export function LoadingScreen() {
  const { colors } = useTheme();

  return (
    <Container>
      <Logo color={colors.gray[950]} size={35} />
      <ActivityIndicator size={"large"} />
    </Container>
  )
}
