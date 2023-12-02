import { TouchableOpacity } from 'react-native';

import FilterIcon from './filter-icon.svg';

type Props = {
  onPress?: () => void;
};
export function FilterTrigger({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FilterIcon />
    </TouchableOpacity>
  );
};
