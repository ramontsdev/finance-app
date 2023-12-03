import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const IncomeButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  padding: 4px 12px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.success.default};
`;

export const ExpenseButton = styled.TouchableOpacity`
  flex-direction: row;
  gap: 4px;
  padding: 4px 12px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.danger.default};
`;
