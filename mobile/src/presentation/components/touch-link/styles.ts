import styled from "styled-components/native";
import { Text } from "../text";

export const TouchWrap = styled.TouchableOpacity``;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.primary[400]};
  font-weight: 500;
`;
