import styled from "styled-components/native";
import { Text } from "../../../../../components/text";

export const Wrapper = styled.Pressable`
  width: 100%;
  height: 75px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const TransactionLeftSideCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const TransactionName = styled(Text)`
  font-size: 16px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.gray.default};
`;

export const TransactionDate = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;

type TextProps = {
  color: string;
}
export const TransactionAmount = styled(Text) <TextProps>`
  font-size: 16px;
  font-weight: 600;

  color: ${({ color }) => color ? color : '#000'};
`;
