import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightness};
`;

export const Header = styled.View``;

export const FiltersWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px 16px 4px 16px;
`;

export const TransactionsWrapper = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

