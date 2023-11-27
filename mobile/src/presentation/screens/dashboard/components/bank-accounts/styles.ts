import styled from "styled-components/native";
import { Text } from "../../../../components/text";

export const Container = styled.View`
  height: 26%;
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.darkness};
`;

export const Title = styled(Text)`
  font-weight: 500;
  color: white;
`;

export const AccountsWrapper = styled.View`
  margin-top: 16px;
`;

export const AddBankAccountButton = styled.TouchableOpacity`
  width: 100%;
  height: 90%;

  justify-content: center;
  align-items: center;

  gap: 8px;

  border-radius: 16px;
  border: 1px dashed white;
`;

export const IconWrap = styled.View`
  width: 50px;
  height: 50px;

  justify-content: center;
  align-items: center;

  border-radius: 16px;
  border: 1px solid white;
`;
