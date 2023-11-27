import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 8px 16px;

  background-color: ${({ theme }) => theme.colors.lightness};
`;
