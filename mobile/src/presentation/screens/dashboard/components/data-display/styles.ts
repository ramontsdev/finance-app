import styled from "styled-components/native";
import { Text } from "../../../../components/text";

export const Wrapper = styled.TouchableOpacity`
  padding: 0px 8px;
  border: 1px solid #000;
  border-radius: 8px;

  height: 48px;
  justify-content: center;
`;

export const Label = styled(Text)`
  font-size: 13px;
`;

export const Value = styled(Text)`
  font-size: 18px;
`;