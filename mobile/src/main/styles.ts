import styled from "styled-components/native";

// ${Platform.OS === 'android' && css`padding-top: ${StatusBar.currentHeight}px`}
export const GlobalContainer = styled.SafeAreaView`

  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.default};
`
