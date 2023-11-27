import { TouchableOpacity } from "react-native";
import { useAuth } from "../../../../../../../contexts/auth-context";
import { Text } from "../../../../../../components/text";
import { Container } from "./styles";

type Props = {
  onClose: () => void;
}

export function Items({ onClose }: Props) {
  const { signOut } = useAuth();
  return (
    <Container>
      <TouchableOpacity
        onPress={signOut}
      >
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
    </Container>
  )
}
