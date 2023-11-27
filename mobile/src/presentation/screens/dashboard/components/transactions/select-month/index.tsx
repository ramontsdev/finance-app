import { MONTHS } from '../../../../../utils/constants';
import { TouchLeft, TouchRight, Wrapper } from './styles';

import { Text } from '../../../../../components/text';
import ChevronLeft from './chevron_left.svg';
import ChevronRight from './chevron_right.svg';

type Props = {
  onChange: (month: number) => void;
  selectedMonth: number;
}
export function SelectMonth({ onChange, selectedMonth }: Props) {
  function nextMonth() {
    onChange(selectedMonth < 11 ? selectedMonth + 1 : 11);
  }

  function previousMonth() {
    onChange(selectedMonth > 0 ? selectedMonth - 1 : 0);
  }

  return (
    <Wrapper>
      <TouchLeft onPress={previousMonth}>
        <ChevronLeft />
      </TouchLeft>

      <Text>{MONTHS[selectedMonth]}</Text>

      <TouchRight onPress={nextMonth}>
        <ChevronRight />
      </TouchRight>
    </Wrapper>
  );
}
