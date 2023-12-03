import styled, { css } from "styled-components/native";
import { Text } from "../text";

type WrapProps = {
  hasLabel: boolean;
  darkColor?: boolean;
}
export const Wrap = styled.View<WrapProps>`
  padding: 0px 8px;
  border: 1px solid #fff;
  border-radius: 8px;

  ${({ hasLabel }) => !hasLabel && css`
    height: 48px;
    justify-content: center;
  `}

  ${({ darkColor }) => darkColor && css`
    border-color: ${({ theme }) => theme.colors.gray.default};
  `}
`
export const Label = styled(Text)`
  font-size: 13px;
`
type TextInputProps = {
  color?: string;
}
export const TextInput = styled.TextInput<TextInputProps>`
  height: 30px;
  font-size: 18px;

  padding: 0;
  color: ${({ color, theme }) => color || theme.colors.gray[50]};
`
export const TextError = styled(Text)`
  margin-left: 4px;
  font-size: 12px;

  color: ${({ theme }) => theme.colors.danger.default};
`
