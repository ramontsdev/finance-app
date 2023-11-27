import styled from "styled-components/native";
import { Text } from "../../../../../components/text";

export const Wrap = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const Label = styled(Text)`
  font-weight: 500;
`;
