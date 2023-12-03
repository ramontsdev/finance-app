import { ActivityIndicator } from "react-native";
import { Wrapper } from "./styles";

export function Loading() {
  return (
    <Wrapper>
      <ActivityIndicator size={"large"} />
    </Wrapper>
  )
}
