import styled from "styled-components/native";

export const Overlay = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const DropdownBody = styled.View`
  width: 150px;

  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: 8px;
`;
