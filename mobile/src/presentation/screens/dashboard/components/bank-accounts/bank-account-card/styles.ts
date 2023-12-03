import styled from "styled-components/native";
import { Text } from "../../../../../components/text";

export const Wrapper = styled.Pressable`
  width: 250px;
  height: 130px;

  padding: 8px 16px;
  justify-content: space-between;

  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.primary.default};
`;

export const BankAccountName = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Balance = styled(Text)`
  font-size: 14px;
  font-weight: 500;
`;
export const TextSmall = styled(Text)`
  font-size: 12px;
`;
