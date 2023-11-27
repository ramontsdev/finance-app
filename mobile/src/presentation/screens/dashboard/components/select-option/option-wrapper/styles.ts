import styled from "styled-components/native";
import { Text } from "../../../../../components/text";

export const Wrap = styled.View``

export const OverflowClose = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  border-radius: 8px;

  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

export const Option = styled.TouchableOpacity`
  height: 35px;
  justify-content: center;
  padding: 0px 10px;
`;
export const Label = styled(Text)`
  font-size: 16px;
`;
