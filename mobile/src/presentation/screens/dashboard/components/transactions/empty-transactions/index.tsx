import { Text } from "../../../../../components/text";
import { Wrapper } from "./styles";

import EmptyStateIcon from './empty-state.svg';

export function EmptyTransactions() {
  return (
    <Wrapper>
      <EmptyStateIcon />
      <Text>Não há transações</Text>
    </Wrapper>
  )
}
