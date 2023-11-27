import { ActivityIndicator } from "react-native";
import { Logo } from "../logo";
import { Container } from "./styles";

export function LoadingScreen() {
  return (
    <Container>
      <Logo />
      <ActivityIndicator size={"large"} />
    </Container>
  )
}
