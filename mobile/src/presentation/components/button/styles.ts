import styled, { css } from "styled-components/native";
import { Text } from "../text";

export const Wrap = styled.View`
  border-radius: 8px;
  overflow: hidden;
`
type LabelProps = {
  variant?: 'danger' | 'ghost' | 'default';
}
export const Label = styled(Text) <LabelProps>`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray[50]};

  ${({ variant }) => variant && css`
    color: ${({ theme }) => theme.colors.gray[50]};
  `}

  ${({ variant }) => variant === 'ghost' && css`
    color: #000000;
  `}
`

type Props = {
  variant?: 'danger' | 'ghost' | 'default';
}
export const Pressable = styled.Pressable.attrs(props => ({
  android_ripple: { color: props.theme.colors.primary[400] },
})) <Props>`
  height: 48px;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary.default};

  ${({ disabled }) => disabled && css`
    background-color: ${({ theme }) => theme.colors.gray[200]};
  `}

  ${({ variant }) => variant === 'danger' && css`
    background-color: #ff0000;
  `}

  ${({ variant }) => variant === 'ghost' && css`
    background-color: transparent;
    border: 1px solid #000000;
  `}
`;
