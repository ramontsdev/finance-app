import styled from "styled-components/native";
import { Text } from "../../../../components/text";

export const Wrap = styled.TouchableOpacity`
  padding: 0px 8px;
  border: 1px solid #000;
  border-radius: 8px;

  height: 48px;
  flex-direction: row;
`;

export const Label = styled(Text)`
  font-size: 13px;
`;

export const Content = styled.View`
  flex: 1;

  flex-direction: column;
`;

export const Value = styled(Text)`
  font-size: 18px;
`;

export const RightIcon = styled.View`
  height: 100%;

  justify-content: center;
`;
export const TextError = styled(Text)`
  margin-left: 4px;
  font-size: 12px;

  color: ${({ theme }) => theme.colors.danger};
`
