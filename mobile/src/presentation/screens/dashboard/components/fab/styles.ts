import styled from "styled-components/native";

export const Wrapper = styled.TouchableOpacity`
  width: 62px;
  height: 62px;

  position: absolute;
  bottom: 53px;
  right: 16px;

  justify-content: center;
  align-items: center;

  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.darkness};
`;
