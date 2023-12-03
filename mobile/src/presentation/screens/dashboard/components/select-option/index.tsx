import { useRef, useState } from 'react';
import { View } from 'react-native';
import { OptionWrapper } from './option-wrapper';
import { Content, Label, RightIcon, TextError, Value, Wrap } from "./styles";

import { useTheme } from 'styled-components/native';
import ChevronDownIcon from './chevron_down_icon.svg';

type Props = {
  label: string;
  onSelect: (value: string) => void;
  options: Array<{ value: string; label: string; }>;
  errorMessage?: string;
  value?: string;
  darkColor?: boolean;
}
export function SelectOption({ label, onSelect, options, errorMessage, value = '', darkColor }: Props) {
  const [_value, setValue] = useState(value);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const triggerRef = useRef(null);

  const { colors } = useTheme();

  const currentColor = darkColor
    ? colors.gray.default
    : undefined;

  return (
    <>
      <View>
        <Wrap
          activeOpacity={0.5}
          onPress={() => setIsOpenOptions(true)}
          ref={triggerRef}
        >
          <Content>
            <Label color={currentColor}>
              {label}
            </Label>

            <Value color={currentColor}>
              {_value}
            </Value>
          </Content>

          <RightIcon>
            <ChevronDownIcon />
          </RightIcon>
        </Wrap>

        {errorMessage && <TextError>{errorMessage}</TextError>}
      </View>

      <OptionWrapper
        darkColor={darkColor}
        options={options}
        onClose={() => setIsOpenOptions(false)}
        isOpen={isOpenOptions}
        triggerRef={triggerRef}
        onSelect={(option) => {
          setValue(option.label);
          onSelect?.(option.value);
        }}
      />
    </>
  )
}
