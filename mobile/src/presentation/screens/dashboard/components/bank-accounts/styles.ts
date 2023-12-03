import styled from "styled-components/native";
import { Text } from "../../../../components/text";

export const Container = styled.View`
  min-height: 28%;
  padding: 8px 16px 4px 16px;

  gap: 16px;

  background-color: ${({ theme }) => theme.colors.gray.default};
`;

export const TotalBalanceWrap = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TotalBalanceTitle = styled(Text)`
    font-weight: 300;
    color: white;
`;

export const TotalBalance = styled(Text)`
  font-weight: 500;
  color: white;
`;

export const Title = styled(Text)`
  font-weight: 500;
  color: white;
`;

export const AccountsWrapper = styled.View`
  margin-top: 8px;
`;

export const AddBankAccountButton = styled.TouchableOpacity`
  width: 100%;
  height: 138px;

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
