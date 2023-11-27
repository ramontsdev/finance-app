import { TouchableOpacity } from 'react-native';

import FilterIcon from './filter-icon.svg';

export function FilterTrigger() {
  return (
    <TouchableOpacity>
      <FilterIcon />
    </TouchableOpacity>
  );
}
