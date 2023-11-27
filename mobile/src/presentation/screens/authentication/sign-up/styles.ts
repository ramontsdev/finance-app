import styled from "styled-components/native";
import { Text } from "../../../components/text";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.lightness};
`
export const Wrapper = styled.View`
  width: 90%;
  gap: 16px;
`
export const Header = styled.View`
  justify-content: center;
  align-items: center;

  gap: 8px;
  margin-bottom: 40px;
`
export const Wrap = styled.View`
  flex-direction: row;
  gap: 4px;
`
export const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`
