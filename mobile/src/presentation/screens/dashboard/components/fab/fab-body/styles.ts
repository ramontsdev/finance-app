import styled from "styled-components/native";

export const Overlay = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const Body = styled.View`
  padding: 8px;
  gap: 8px;

  position: absolute;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const TouchOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
