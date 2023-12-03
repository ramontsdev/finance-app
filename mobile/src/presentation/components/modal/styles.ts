import styled from "styled-components/native";
import { Text } from "../text";

export const Overlay = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute;

  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.View`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.gray.default};
`;

export const BodyModal = styled.View`
  width: 90%;

  padding: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;
