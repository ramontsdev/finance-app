import { useRef, useState } from 'react';
import { View } from 'react-native';
import { OptionWrapper } from './option-wrapper';
import { Content, Label, RightIcon, TextError, Value, Wrap } from "./styles";

import ChevronDownIcon from './chevron_down_icon.svg';

type Props = {
  label: string;
  onSelect: (value: string) => void;
  options: Array<{ value: string; label: string; }>;
  errorMessage?: string;
  value?: string;
}
export function SelectOption({ label, onSelect, options, errorMessage, value = '' }: Props) {
  const [_value, setValue] = useState(value);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const triggerRef = useRef(null);

  return (
    <>
      <View>
        <Wrap
          activeOpacity={0.5}
          onPress={() => setIsOpenOptions(true)}
          ref={triggerRef}
        >
          <Content>
            <Label>
              {label}
            </Label>

            <Value>
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
