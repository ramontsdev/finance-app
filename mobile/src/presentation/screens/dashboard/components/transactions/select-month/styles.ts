import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  padding: 4px;
`;

export const TouchLeft = styled.TouchableOpacity`
  width: 45px;
  height: 30px;

  justify-content: center;
`;

export const TouchRight = styled.TouchableOpacity`
  width: 45px;
  height: 30px;

  justify-content: center;
  align-items: flex-end;
`;
